import { Test, TestingModule } from '@nestjs/testing';
import { ApplyJobController } from './apply-job.controller';
import { ApplyJobService } from './apply-job.service';

const mockApplyJobService = {
  create: jest.fn(),
  findAll: jest.fn(),
  getApplyJobById: jest.fn(),
  updateStatus: jest.fn(),
};

describe('ApplyJobController', () => {
  let controller: ApplyJobController;
  let service: ApplyJobService;

  const mockUser = { element: { id: 'user-123' } };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplyJobController],
      providers: [
        {
          provide: ApplyJobService,
          useValue: mockApplyJobService,
        },
      ],
    }).compile();

    controller = module.get<ApplyJobController>(ApplyJobController);
    service = module.get<ApplyJobService>(ApplyJobService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an apply job', async () => {
      const dto = { jobId: 'job-1', fileId: 'file-1' };
      mockApplyJobService.create.mockResolvedValue({ success: true });
      const result = await controller.create(dto as any, mockUser as any);
      expect(service.create).toHaveBeenCalledWith({ ...dto, candidateId: mockUser.element.id });
      expect(result).toEqual({ success: true });
    });
  });

  describe('findAll', () => {
    it('should return all apply jobs for employer', async () => {
      const query = { page: 1, limit: 10 };
      const mockResult = { applyJobs: [], currentPage: 1, nextPage: null, total: 0 };
      mockApplyJobService.findAll.mockResolvedValue(mockResult);
      const result = await controller.findAll(query as any, mockUser as any);
      expect(service.findAll).toHaveBeenCalledWith(mockUser.element.id, query);
      expect(result).toEqual(mockResult);
    });
  });

  describe('getApplyJobById', () => {
    it('should return apply job by id', async () => {
      const mockApplyJob = { id: 'apply-1' };
      mockApplyJobService.getApplyJobById.mockResolvedValue(mockApplyJob);
      const result = await controller.getApplyJobById('apply-1', mockUser as any);
      expect(service.getApplyJobById).toHaveBeenCalledWith('apply-1', mockUser.element.id);
      expect(result).toEqual(mockApplyJob);
    });
  });

  describe('updateStatus', () => {
    it('should update status of apply job', async () => {
      const dto = { status: 'SEEN' };
      const mockResult = { affected: 1 };
      mockApplyJobService.updateStatus.mockResolvedValue(mockResult);
      const result = await controller.updateStatus('apply-1', mockUser as any, dto as any);
      expect(service.updateStatus).toHaveBeenCalledWith('apply-1', mockUser.element.id, dto);
      expect(result).toEqual(mockResult);
    });
  });
});
