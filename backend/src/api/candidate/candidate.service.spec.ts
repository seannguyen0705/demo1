import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CandidateService } from './candidate.service';
import { Candidate } from './entities/candidate.entity';
import { CandidateRepository } from './candidate.repository';
import { TokenService } from '../token/token.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { EmailService } from '../email/email.service';
import { UserAlreadyException } from '@/api/auth/auth.exceptions';
import { NotFoundException } from '@nestjs/common';
import { UserStatus } from '@/common/enums';
import { DataSource } from 'typeorm';

const mockTokenService = {
  getAllByUser: jest.fn(),
};
const mockCloudinaryService = {};
const mockEmailService = {};

const mockCandidateRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  count: jest.fn(),
  createQueryBuilder: jest.fn(),
};

describe('CandidateService', () => {
  let service: CandidateService;
  let repository: CandidateRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidateService,
        { provide: getRepositoryToken(Candidate), useValue: mockCandidateRepository },
        { provide: TokenService, useValue: mockTokenService },
        { provide: CloudinaryService, useValue: mockCloudinaryService },
        { provide: EmailService, useValue: mockEmailService },
        { provide: DataSource, useValue: {} },
      ],
    }).compile();
    service = module.get<CandidateService>(CandidateService);
    repository = module.get<CandidateRepository>(getRepositoryToken(Candidate));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a candidate successfully', async () => {
      const dto = { email: 'test@example.com' };
      mockCandidateRepository.findOneBy.mockResolvedValue(null);
      mockCandidateRepository.create.mockReturnValue({ ...dto, toResponse: () => ({ email: dto.email }) });
      mockCandidateRepository.save.mockResolvedValue({ ...dto });
      const result = await service.create(dto as any);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual({ email: dto.email });
    });
    it('should throw UserAlreadyException if candidate exists', async () => {
      const dto = { email: 'test@example.com' };
      mockCandidateRepository.findOneBy.mockResolvedValue({ id: '1', email: dto.email });
      await expect(service.create(dto as any)).rejects.toThrow(UserAlreadyException);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a candidate by email', async () => {
      const mockCandidate = { id: '1', email: 'test@example.com' };
      mockCandidateRepository.findOneBy.mockResolvedValue(mockCandidate);
      const result = await service.findOneByEmail('test@example.com');
      expect(result).toEqual(mockCandidate);
    });
  });

  describe('findOneByEmailOrPhoneNumber', () => {
    it('should return a candidate by email or phone number', async () => {
      const mockCandidate = { id: '1', email: 'test@example.com', phoneNumber: '123' };
      mockCandidateRepository.findOneBy.mockResolvedValue(mockCandidate);
      const result = await service.findOneByEmailOrPhoneNumber({ email: 'test@example.com', phoneNumber: '123' });
      expect(result).toEqual(mockCandidate);
    });
  });

  describe('getDetailById', () => {
    it('should return candidate detail with sessions', async () => {
      const mockCandidate = {
        id: '1',
        toResponseHavingSessions: jest.fn().mockReturnValue({ id: '1', sessions: [1, 2] }),
      };
      mockCandidateRepository.findOneBy.mockResolvedValue(mockCandidate);
      mockTokenService.getAllByUser.mockResolvedValue([1, 2]);
      const result = await service.getDetailById('1');
      expect(mockCandidate.toResponseHavingSessions).toHaveBeenCalledWith([1, 2]);
      expect(result).toEqual({ id: '1', sessions: [1, 2] });
    });
  });

  describe('updateByCandidate', () => {
    it('should update candidate info', async () => {
      const candidate = { id: '1', phoneNumber: '123' };
      const data = { phoneNumber: '456' };
      mockCandidateRepository.findOneBy.mockResolvedValue(null); // for findOneByEmailOrPhoneNumber
      mockCandidateRepository.create.mockReturnValue({
        ...candidate,
        ...data,
        toResponse: () => ({ id: '1', phoneNumber: '456' }),
      });
      mockCandidateRepository.save.mockResolvedValue({ ...candidate, ...data });
      const result = await service.updateByCandidate({ candidate: candidate as any, data: data as any });
      expect(result).toEqual({ id: '1', phoneNumber: '456' });
    });
    it('should throw UserAlreadyException if phone number exists', async () => {
      const candidate = { id: '1', phoneNumber: '123' };
      const data = { phoneNumber: '789' };
      mockCandidateRepository.findOneBy.mockResolvedValueOnce({ id: '1', phoneNumber: '123' }); // for findOneByEmailOrPhoneNumber
      mockCandidateRepository.findOneBy.mockResolvedValueOnce({ id: '2', phoneNumber: '789' }); // for existedCandidate
      await expect(service.updateByCandidate({ candidate: candidate as any, data: data as any })).rejects.toThrow(
        UserAlreadyException,
      );
    });
  });

  describe('updateById', () => {
    it('should update candidate by id', async () => {
      const id = '1';
      const data = { phoneNumber: '456' };
      const candidate = { id, phoneNumber: '123' };

      mockCandidateRepository.findOneBy.mockResolvedValue(null); // for findOneByEmailOrPhoneNumber
      mockCandidateRepository.create.mockReturnValue({ ...candidate, ...data });
      mockCandidateRepository.save.mockResolvedValue({ ...candidate, ...data });
      const result = await service.updateById(id, data as any);
      expect(result).toEqual({ ...candidate, ...data });
    });
    it('should throw NotFoundException if candidate not found', async () => {
      mockCandidateRepository.findOneBy.mockResolvedValue(null);
      await expect(service.updateById('not-exist', { phoneNumber: '456' } as any)).rejects.toThrow(NotFoundException);
    });

    it('should throw UserAlreadyException if phone number exists', async () => {
      const id = '1';
      const data = { phoneNumber: '456' };
      const candidate = { id, phoneNumber: '123' };

      mockCandidateRepository.findOneBy.mockResolvedValue(candidate); // for findOneByEmailOrPhoneNumber
      mockCandidateRepository.findOneBy.mockResolvedValueOnce({ id: '1', phoneNumber: '123' }); // for existedCandidate
      mockCandidateRepository.create.mockReturnValue({ ...candidate, ...data });
      mockCandidateRepository.save.mockResolvedValue({ ...candidate, ...data });
      await expect(service.updateById(id, data as any)).rejects.toThrow(UserAlreadyException);
    });
  });

  describe('findOneById', () => {
    it('should return a candidate by id', async () => {
      const mockQueryBuilder: any = {
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue({ id: '1' }),
      };
      mockCandidateRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      const result = await service.findOneById('1');
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('findCandidates', () => {
    it('should return paginated candidates', async () => {
      const mockQueryBuilder: any = {
        select: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[{ id: '1' }], 1]),
      };
      mockCandidateRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);
      const query = { page: 1, limit: 10, keyword: '', status: UserStatus.ACTIVE, orderBy: 'id', order: 'ASC' };
      const result = await service.findCandidates(query as any);
      expect(result).toEqual({ candidates: [{ id: '1' }], currentPage: 1, nextPage: null, total: 1 });
    });
  });

  describe('countAllCandidates', () => {
    it('should return count of all active candidates', async () => {
      mockCandidateRepository.count.mockResolvedValue(5);
      const result = await service.countAllCandidates();
      expect(result).toBe(5);
      expect(repository.count).toHaveBeenCalledWith({ where: { status: UserStatus.ACTIVE } });
    });
  });

  describe('createThirdPartyUser', () => {
    it('should create a third party user', async () => {
      const user = { email: 'thirdparty@example.com' };
      mockCandidateRepository.save.mockResolvedValue(user);
      const result = await service.createThirdPartyUser(user as any);
      expect(result).toEqual(user);
    });
  });
});
