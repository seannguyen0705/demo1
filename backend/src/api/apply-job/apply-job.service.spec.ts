import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ApplyJobService } from './apply-job.service';
import { ApplyJob } from './entities/apply-job.entity';
import { ApplyJobRepository } from './apply-job.repository';
import { DataSource, QueryRunner } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { JobStatus, ApplyJobStatus } from '@/common/enums';

const mockApplyJobRepository = {
  count: jest.fn(),
  createQueryBuilder: jest.fn(),
  update: jest.fn(),
};

const mockDataSource = {
  createQueryRunner: jest.fn(),
};

describe('ApplyJobService', () => {
  let service: ApplyJobService;
  let repository: ApplyJobRepository;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    queryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        findOne: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
      },
    } as any;
    mockDataSource.createQueryRunner.mockReturnValue(queryRunner);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplyJobService,
        { provide: getRepositoryToken(ApplyJob), useValue: mockApplyJobRepository },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();
    service = module.get<ApplyJobService>(ApplyJobService);
    repository = module.get<ApplyJobRepository>(getRepositoryToken(ApplyJob));
    dataSource = module.get<DataSource>(DataSource);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const data = { jobId: 'job-1', candidateId: 'cand-1' };
    it('should create apply job successfully', async () => {
      const job = { id: 'job-1', expiredAt: new Date(Date.now() + 100000), status: JobStatus.PUBLISHED };
      queryRunner.manager.findOne = jest
        .fn()
        .mockResolvedValueOnce(job) // find job
        .mockResolvedValueOnce(null) // hasApplied
        .mockResolvedValueOnce(null); // saveJob
      queryRunner.manager.save = jest.fn().mockResolvedValue({});
      await service.create(data as any);
      expect(queryRunner.manager.save).toHaveBeenCalledWith(ApplyJob, data);
      expect(queryRunner.commitTransaction).toHaveBeenCalled();
    });
    it('should throw if job expired', async () => {
      const job = { id: 'job-1', expiredAt: new Date(Date.now() - 100000), status: JobStatus.PUBLISHED };
      queryRunner.manager.findOne = jest.fn().mockResolvedValueOnce(job);
      await expect(service.create(data as any)).rejects.toThrow(BadRequestException);
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
    });
    it('should throw if job not published', async () => {
      const job = { id: 'job-1', expiredAt: new Date(Date.now() + 100000), status: JobStatus.DRAFT };
      queryRunner.manager.findOne = jest.fn().mockResolvedValueOnce(job);
      await expect(service.create(data as any)).rejects.toThrow(BadRequestException);
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
    });
    it('should throw if already applied', async () => {
      const job = { id: 'job-1', expiredAt: new Date(Date.now() + 100000), status: JobStatus.PUBLISHED };
      queryRunner.manager.findOne = jest
        .fn()
        .mockResolvedValueOnce(job) // find job
        .mockResolvedValueOnce({ id: 'applied' }); // hasApplied
      await expect(service.create(data as any)).rejects.toThrow(BadRequestException);
      expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
    });
  });

  describe('staticsticsByJobId', () => {
    it('should return statistics for a job', async () => {
      mockApplyJobRepository.count
        .mockResolvedValueOnce(1) // NEW
        .mockResolvedValueOnce(2) // SEEN
        .mockResolvedValueOnce(3) // INTERVIEWING
        .mockResolvedValueOnce(4) // HIRED
        .mockResolvedValueOnce(5); // REJECTED
      const result = await service.staticsticsByJobId('job-1');
      expect(result).toEqual({
        countNew: 1,
        countSeen: 2,
        countInterviewing: 3,
        countHired: 4,
        countRejected: 5,
        countTotal: 15,
      });
    });
  });

  describe('findAll', () => {
    it('should return paginated apply jobs', async () => {
      const mockQueryBuilder: any = {
        innerJoin: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addOrderBy: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[{ toResponse: () => ({ id: '1' }) }], 1]),
      };
      mockApplyJobRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      const query = { page: 1, limit: 10, orderBy: 'CREATED_AT', order: 'DESC' };
      const result = await service.findAll('employer-1', query as any);
      expect(result).toEqual({ applyJobs: [{ id: '1' }], currentPage: 1, nextPage: null, total: 1 });
    });
  });

  describe('getApplyJobById', () => {
    it('should return apply job by id', async () => {
      const mockQueryBuilder: any = {
        innerJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue({ toResponse: () => ({ id: '1' }) }),
      };
      mockApplyJobRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      const result = await service.getApplyJobById('apply-1', 'employer-1');
      expect(result).toEqual({ id: '1' });
    });
    it('should throw NotFoundException if not found', async () => {
      const mockQueryBuilder: any = {
        innerJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      };
      mockApplyJobRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      await expect(service.getApplyJobById('apply-1', 'employer-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateStatus', () => {
    it('should update status if valid transition', async () => {
      const id = 'apply-1';
      const employerId = 'employer-1';
      const data = { status: ApplyJobStatus.SEEN };
      const mockApplyJob = { status: ApplyJobStatus.NEW };
      const mockQueryBuilder: any = {
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockApplyJob),
      };
      mockApplyJobRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      mockApplyJobRepository.update.mockResolvedValue({ affected: 1 });
      const result = await service.updateStatus(id, employerId, data as any);
      expect(result).toEqual({ affected: 1 });
    });
    it('should throw NotFoundException if not found', async () => {
      const id = 'apply-1';
      const employerId = 'employer-1';
      const data = { status: ApplyJobStatus.SEEN };
      const mockQueryBuilder: any = {
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      };
      mockApplyJobRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      await expect(service.updateStatus(id, employerId, data as any)).rejects.toThrow(NotFoundException);
    });
    it('should throw BadRequestException if invalid transition', async () => {
      const id = 'apply-1';
      const employerId = 'employer-1';
      const data = { status: ApplyJobStatus.HIRED };
      const mockApplyJob = { status: ApplyJobStatus.NEW };
      const mockQueryBuilder: any = {
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockApplyJob),
      };
      mockApplyJobRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      await expect(service.updateStatus(id, employerId, data as any)).rejects.toThrow(BadRequestException);
    });
  });
});
