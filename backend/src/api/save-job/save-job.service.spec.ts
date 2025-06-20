import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SaveJobService } from './save-job.service';
import { SaveJob } from './entities/save-job.entity';
import { SaveJobRepository } from './save-job.repository';
import { NotFoundException } from '@nestjs/common';

describe('SaveJobService', () => {
  let service: SaveJobService;
  let repository: SaveJobRepository;

  const mockSaveJobRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaveJobService,
        {
          provide: getRepositoryToken(SaveJob),
          useValue: mockSaveJobRepository,
        },
      ],
    }).compile();

    service = module.get<SaveJobService>(SaveJobService);
    repository = module.get<SaveJobRepository>(getRepositoryToken(SaveJob));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSaveJob', () => {
    const mockCreateSaveJobDto = {
      jobId: 'job-123',
      candidateId: 'candidate-123',
    };

    const mockSaveJob = {
      id: 'save-job-123',
      ...mockCreateSaveJobDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should create a save job successfully', async () => {
      mockSaveJobRepository.create.mockReturnValue(mockSaveJob);
      mockSaveJobRepository.save.mockResolvedValue(mockSaveJob);

      const result = await service.createSaveJob(mockCreateSaveJobDto);

      expect(mockSaveJobRepository.create).toHaveBeenCalledWith(mockCreateSaveJobDto);
      expect(mockSaveJobRepository.save).toHaveBeenCalledWith(mockSaveJob);
      expect(result).toEqual(mockSaveJob);
    });
  });

  describe('deleteSaveJob', () => {
    const mockSaveJobId = 'save-job-123';
    const mockCandidateId = 'candidate-123';

    const mockSaveJob = {
      id: mockSaveJobId,
      jobId: 'job-123',
      candidateId: mockCandidateId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should delete a save job successfully', async () => {
      mockSaveJobRepository.findOneBy.mockResolvedValue(mockSaveJob);
      mockSaveJobRepository.remove.mockResolvedValue(mockSaveJob);

      const result = await service.deleteSaveJob(mockSaveJobId, mockCandidateId);

      expect(mockSaveJobRepository.findOneBy).toHaveBeenCalledWith({
        id: mockSaveJobId,
        candidateId: mockCandidateId,
      });
      expect(mockSaveJobRepository.remove).toHaveBeenCalledWith(mockSaveJob);
      expect(result).toEqual(mockSaveJob);
    });

    it('should throw NotFoundException when save job not found', async () => {
      mockSaveJobRepository.findOneBy.mockResolvedValue(null);

      await expect(service.deleteSaveJob(mockSaveJobId, mockCandidateId)).rejects.toThrow(NotFoundException);
      expect(mockSaveJobRepository.findOneBy).toHaveBeenCalledWith({
        id: mockSaveJobId,
        candidateId: mockCandidateId,
      });
      expect(mockSaveJobRepository.remove).not.toHaveBeenCalled();
    });
  });
});
