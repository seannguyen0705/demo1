import { Test, TestingModule } from '@nestjs/testing';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { IJwtStrategy } from '../auth/strategies';
import { UserRole, UserStatus, AuthBy } from '@/common/enums';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { Candidate } from '../candidate/entities';
import { Token } from '../token/entities';

describe('CvController', () => {
  let controller: CvController;
  let cvService: CvService;

  const mockFile = {
    originalname: 'test.pdf',
    mimetype: 'application/pdf',
    buffer: Buffer.from('test'),
  } as Express.Multer.File;

  const mockCv = {
    id: uuidv4(),
    candidateId: uuidv4(),
    fileId: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCandidateData = {
    id: uuidv4(),
    email: 'test@example.com',
    fullName: 'Test User',
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
    authBy: AuthBy.LOCAL,
    status: UserStatus.ACTIVE,
    allowNotify: false,
    avatar_url: null,
    title: null,
    address: null,
    personal_website: null,
    introduction: null,
    experiences: [],
    candidateSkills: [],
  };

  const mockCandidate = {
    ...mockCandidateData,
    toResponse: jest.fn().mockReturnValue({
      ...mockCandidateData,
      role: UserRole.CANDIDATE,
    }),
    toResponseHavingSessions: jest.fn().mockImplementation((sessions: Token[]) => ({
      ...mockCandidateData,
      role: UserRole.CANDIDATE,
      sessions,
    })),
  } as unknown as Candidate;

  const mockUser: IJwtStrategy = {
    element: mockCandidate,
    role: UserRole.CANDIDATE,
  };

  const mockRequest = {
    user: mockUser,
  } as Request & { user: IJwtStrategy };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvController],
      providers: [
        {
          provide: CvService,
          useValue: {
            createCv: jest.fn(),
            updateCv: jest.fn(),
            deleteCv: jest.fn(),
            getCvByCandidateId: jest.fn(),
            getCvByIdAndCandidateId: jest.fn(),
            getCvByCandidateIdAndFileId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CvController>(CvController);
    cvService = module.get<CvService>(CvService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCv', () => {
    it('should create a new CV', async () => {
      (cvService.createCv as jest.Mock).mockResolvedValue(mockCv);

      const result = await controller.createCv(mockFile, mockUser);

      expect(cvService.createCv).toHaveBeenCalledWith(mockUser.element.id, mockFile);
      expect(result).toEqual(mockCv);
    });
  });

  describe('updateCv', () => {
    it('should update an existing CV', async () => {
      const id = uuidv4();
      (cvService.updateCv as jest.Mock).mockResolvedValue(mockCv);

      const result = await controller.updateCv(id, mockFile, mockRequest);

      expect(cvService.updateCv).toHaveBeenCalledWith(id, mockUser.element.id, mockFile);
      expect(result).toEqual(mockCv);
    });
  });

  describe('deleteCv', () => {
    it('should delete an existing CV', async () => {
      const id = uuidv4();
      (cvService.deleteCv as jest.Mock).mockResolvedValue({ affected: 1 });

      const result = await controller.deleteCv(id, mockUser);

      expect(cvService.deleteCv).toHaveBeenCalledWith(id, mockUser.element.id);
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('getMyCv', () => {
    it('should return all CVs for the current user', async () => {
      const mockCvs = [mockCv];
      (cvService.getCvByCandidateId as jest.Mock).mockResolvedValue(mockCvs);

      const result = await controller.getMyCv(mockUser);

      expect(cvService.getCvByCandidateId).toHaveBeenCalledWith(mockUser.element.id);
      expect(result).toEqual(mockCvs);
    });
  });

  describe('getCvByCandidateId', () => {
    it('should return all CVs for a specific candidate', async () => {
      const candidateId = uuidv4();
      const mockCvs = [mockCv];
      (cvService.getCvByCandidateId as jest.Mock).mockResolvedValue(mockCvs);

      const result = await controller.getCvByCandidateId(candidateId);

      expect(cvService.getCvByCandidateId).toHaveBeenCalledWith(candidateId);
      expect(result).toEqual(mockCvs);
    });
  });
});
