import { Test, TestingModule } from '@nestjs/testing';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';

describe('CandidateController', () => {
  let controller: CandidateController;
  let service: CandidateService;

  const mockCandidateService = {
    create: jest.fn(),
    findCandidates: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidateController],
      providers: [
        {
          provide: CandidateService,
          useValue: mockCandidateService,
        },
      ],
    }).compile();

    controller = module.get<CandidateController>(CandidateController);
    service = module.get<CandidateService>(CandidateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a candidate', async () => {
      const dto = { email: 'test@example.com' };
      const mockResponse = { id: '1', email: 'test@example.com' };
      mockCandidateService.create.mockResolvedValue(mockResponse);
      const result = await controller.create(dto as any);
      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });

    it('should throw error if service throws', async () => {
      const dto = { email: 'test@example.com' };
      mockCandidateService.create.mockRejectedValue(new Error('Service error'));
      await expect(controller.create(dto as any)).rejects.toThrow('Service error');
    });
  });

  describe('getCandidates', () => {
    it('should return paginated candidates', async () => {
      const query = { page: 1, limit: 10 };
      const mockResult = {
        candidates: [{ id: '1', email: 'test@example.com' }],
        currentPage: 1,
        nextPage: null,
        total: 1,
      };
      mockCandidateService.findCandidates.mockResolvedValue(mockResult);
      const result = await controller.getCandidates(query as any);
      expect(service.findCandidates).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockResult);
    });

    it('should throw error if service throws', async () => {
      const query = { page: 1, limit: 10 };
      mockCandidateService.findCandidates.mockRejectedValue(new Error('Service error'));
      await expect(controller.getCandidates(query as any)).rejects.toThrow('Service error');
    });

    it('should work with empty query', async () => {
      const mockResult = {
        candidates: [],
        currentPage: 1,
        nextPage: null,
        total: 0,
      };
      mockCandidateService.findCandidates.mockResolvedValue(mockResult);
      const result = await controller.getCandidates({} as any);
      expect(service.findCandidates).toHaveBeenCalledWith({});
      expect(result).toEqual(mockResult);
    });
  });
});
