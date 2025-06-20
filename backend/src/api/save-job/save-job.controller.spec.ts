import { Test, TestingModule } from '@nestjs/testing';
import { SaveJobController } from './save-job.controller';
import { SaveJobService } from './save-job.service';
import { CreateSaveJobDto } from './dto/create-save-job.dto';
import { IJwtStrategy } from '../auth/strategies';
import { UserRole, UserStatus } from '@/common/enums';
import { Candidate } from '../candidate/entities';

describe('SaveJobController', () => {
  let controller: SaveJobController;
  let service: SaveJobService;

  const mockSaveJobService = {
    createSaveJob: jest.fn(),
    deleteSaveJob: jest.fn(),
  };

  const mockUser: IJwtStrategy = {
    element: {
      id: 'user-123',
      email: 'test@example.com',
      fullName: 'Test User',
      status: UserStatus.ACTIVE,
      title: 'Software Engineer',
      personal_website: 'https://example.com',
      company: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: 'hashed_password',
      setInsertingData: jest.fn(),
      toResponse: jest.fn(),
      toResponseHavingSessions: jest.fn(),
      authBy: 'LOCAL',
      avatar_url: 'https://example.com/avatar.jpg',
      address: '123 Test St',
      introduction: 'Test introduction',
      phone: '1234567890',
      birthday: new Date(),
      gender: 'MALE',
    } as unknown as Candidate,
    role: UserRole.CANDIDATE,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaveJobController],
      providers: [
        {
          provide: SaveJobService,
          useValue: mockSaveJobService,
        },
      ],
    }).compile();

    controller = module.get<SaveJobController>(SaveJobController);
    service = module.get<SaveJobService>(SaveJobService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSaveJob', () => {
    const mockCreateSaveJobDto: CreateSaveJobDto = {
      jobId: 'job-123',
      candidateId: mockUser.element.id,
    };

    const mockSaveJob = {
      id: 'save-job-123',
      jobId: mockCreateSaveJobDto.jobId,
      candidateId: mockUser.element.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should create a save job successfully', async () => {
      mockSaveJobService.createSaveJob.mockResolvedValue(mockSaveJob);

      const result = await controller.createSaveJob(mockCreateSaveJobDto, mockUser);

      expect(mockSaveJobService.createSaveJob).toHaveBeenCalledWith({
        ...mockCreateSaveJobDto,
        candidateId: mockUser.element.id,
      });
      expect(result).toEqual(mockSaveJob);
    });
  });

  describe('deleteSaveJob', () => {
    const mockSaveJobId = 'save-job-123';
    const mockDeletedSaveJob = {
      id: mockSaveJobId,
      jobId: 'job-123',
      candidateId: mockUser.element.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should delete a save job successfully', async () => {
      mockSaveJobService.deleteSaveJob.mockResolvedValue(mockDeletedSaveJob);

      const result = await controller.deleteSaveJob(mockSaveJobId, mockUser);

      expect(mockSaveJobService.deleteSaveJob).toHaveBeenCalledWith(mockSaveJobId, mockUser.element.id);
      expect(result).toEqual(mockDeletedSaveJob);
    });
  });
});
