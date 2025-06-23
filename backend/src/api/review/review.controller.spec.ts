import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { QueryReviewDto } from './dto/query-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { IJwtStrategy } from '../auth/strategies';
import { Order, OrderByReview, UserRole, UserStatus } from '@/common/enums';
import { Candidate } from '../candidate/entities';

describe('ReviewController', () => {
  let controller: ReviewController;

  const mockReviewService = {
    createReview: jest.fn(),
    findReviewByCompanyId: jest.fn(),
    getStatisticsReviewCompany: jest.fn(),
    getMyReview: jest.fn(),
    deleteReview: jest.fn(),
    updateReview: jest.fn(),
    findAllReview: jest.fn(),
    deleteById: jest.fn(),
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
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: mockReviewService,
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createReview', () => {
    const mockCreateReviewDto: CreateReviewDto = {
      rating: 5,
      comment: 'Great company!',
      companyId: 'company-123',
      candidateId: 'user-123',
    };
    const mockCompanyId = 'company-123';
    const mockReview = {
      id: 'review-123',
      ...mockCreateReviewDto,
      candidateId: mockUser.element.id,
      companyId: mockCompanyId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should create a review successfully', async () => {
      mockReviewService.createReview.mockResolvedValue(mockReview);

      const result = await controller.createReview(mockCreateReviewDto, mockUser, mockCompanyId);

      expect(mockReviewService.createReview).toHaveBeenCalledWith({
        ...mockCreateReviewDto,
        candidateId: mockUser.element.id,
        companyId: mockCompanyId,
      });
      expect(result).toEqual(mockReview);
    });
  });

  describe('getReviewByCompanyId', () => {
    const mockQuery: QueryReviewDto = {
      page: 1,
      limit: 10,
      orderBy: OrderByReview.CREATED_AT,
      order: Order.DESC,
    };
    const mockCompanyId = 'company-123';
    const mockResponse = {
      reviews: [
        {
          id: 'review-1',
          rating: 5,
          comment: 'Great!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      currentPage: 1,
      nextPage: null,
      total: 1,
    };

    it('should return reviews for a company', async () => {
      mockReviewService.findReviewByCompanyId.mockResolvedValue(mockResponse);

      const result = await controller.getReviewByCompanyId(mockQuery, mockCompanyId);

      expect(mockReviewService.findReviewByCompanyId).toHaveBeenCalledWith(mockQuery, mockCompanyId);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getStatisticsReviewCompany', () => {
    const mockCompanyId = 'company-123';
    const mockStats = {
      avg: 4.5,
      count: 10,
    };

    it('should return review statistics for a company', async () => {
      mockReviewService.getStatisticsReviewCompany.mockResolvedValue(mockStats);

      const result = await controller.getStatisticsReviewCompany(mockCompanyId);

      expect(mockReviewService.getStatisticsReviewCompany).toHaveBeenCalledWith(mockCompanyId);
      expect(result).toEqual(mockStats);
    });
  });

  describe('getMyReview', () => {
    const mockCompanyId = 'company-123';
    const mockReview = {
      id: 'review-123',
      rating: 5,
      comment: 'Great!',
      companyId: mockCompanyId,
      candidateId: mockUser.element.id,
    };

    it('should return review for the current user', async () => {
      mockReviewService.getMyReview.mockResolvedValue(mockReview);

      const result = await controller.getMyReview(mockCompanyId, mockUser);

      expect(mockReviewService.getMyReview).toHaveBeenCalledWith(mockCompanyId, mockUser.element.id);
      expect(result).toEqual(mockReview);
    });
  });

  describe('deleteReview', () => {
    const mockReviewId = 'review-123';
    const mockDeleteResult = { affected: 1 };

    it('should delete a review', async () => {
      mockReviewService.deleteReview.mockResolvedValue(mockDeleteResult);

      const result = await controller.deleteReview(mockReviewId, mockUser);

      expect(mockReviewService.deleteReview).toHaveBeenCalledWith(mockReviewId, mockUser.element.id);
      expect(result).toEqual(mockDeleteResult);
    });
  });

  describe('updateReview', () => {
    const mockReviewId = 'review-123';
    const mockUpdateReviewDto: UpdateReviewDto = {
      rating: 4,
      comment: 'Updated comment',
    };
    const mockUpdateResult = { affected: 1 };

    it('should update a review', async () => {
      mockReviewService.updateReview.mockResolvedValue(mockUpdateResult);

      const result = await controller.updateReview(mockReviewId, mockUpdateReviewDto, mockUser);

      expect(mockReviewService.updateReview).toHaveBeenCalledWith(
        mockReviewId,
        mockUser.element.id,
        mockUpdateReviewDto,
      );
      expect(result).toEqual(mockUpdateResult);
    });
  });

  describe('getReviews', () => {
    const mockQuery: QueryReviewDto = {
      page: 1,
      limit: 10,
      keyword: 'test',
      orderBy: OrderByReview.CREATED_AT,
      order: Order.DESC,
    };
    const mockResponse = {
      reviews: [
        {
          id: 'review-1',
          rating: 5,
          comment: 'Great!',
          company: { name: 'Test Company' },
          candidate: { fullName: 'Test User' },
        },
      ],
      currentPage: 1,
      nextPage: null,
      total: 1,
    };

    it('should return all reviews with pagination and search', async () => {
      mockReviewService.findAllReview.mockResolvedValue(mockResponse);

      const result = await controller.getReviews(mockQuery);

      expect(mockReviewService.findAllReview).toHaveBeenCalledWith(mockQuery);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteReviewById', () => {
    const mockReviewId = 'review-123';
    const mockReview = {
      id: mockReviewId,
      rating: 5,
      comment: 'Great!',
    };

    it('should delete a review by id', async () => {
      mockReviewService.deleteById.mockResolvedValue(mockReview);

      const result = await controller.deleteReviewById(mockReviewId);

      expect(mockReviewService.deleteById).toHaveBeenCalledWith(mockReviewId);
      expect(result).toEqual(mockReview);
    });
  });
});
