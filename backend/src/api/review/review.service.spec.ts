import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Order, OrderByReview } from '@/common/enums';

describe('ReviewService', () => {
  let service: ReviewService;

  const mockQueryBuilder = {
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    getRawOne: jest.fn(),
  };

  const mockReviewRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewRepository,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createReview', () => {
    const mockCreateReviewDto = {
      rating: 5,
      comment: 'Great company!',
      candidateId: 'candidate-123',
      companyId: 'company-123',
    };

    const mockReview = {
      id: 'review-123',
      ...mockCreateReviewDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should create a review successfully', async () => {
      mockReviewRepository.findOne.mockResolvedValue(null);
      mockReviewRepository.create.mockReturnValue(mockReview);
      mockReviewRepository.save.mockResolvedValue(mockReview);

      const result = await service.createReview(mockCreateReviewDto);

      expect(mockReviewRepository.findOne).toHaveBeenCalledWith({
        where: {
          candidateId: mockCreateReviewDto.candidateId,
          companyId: mockCreateReviewDto.companyId,
        },
      });
      expect(mockReviewRepository.create).toHaveBeenCalledWith(mockCreateReviewDto);
      expect(mockReviewRepository.save).toHaveBeenCalledWith(mockReview);
      expect(result).toEqual(mockReview);
    });

    it('should throw BadRequestException if review already exists', async () => {
      mockReviewRepository.findOne.mockResolvedValue(mockReview);

      await expect(service.createReview(mockCreateReviewDto)).rejects.toThrow(BadRequestException);
      expect(mockReviewRepository.create).not.toHaveBeenCalled();
      expect(mockReviewRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('findReviewByCompanyId', () => {
    const mockQuery = {
      page: 1,
      limit: 10,
      orderBy: OrderByReview.CREATED_AT,
      order: Order.DESC,
    };
    const mockCompanyId = 'company-123';
    const mockReviews = [
      {
        id: 'review-1',
        rating: 5,
        comment: 'Great!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    it('should return reviews for a company with pagination', async () => {
      mockQueryBuilder.getManyAndCount.mockResolvedValue([mockReviews, 1]);

      const result = await service.findReviewByCompanyId(mockQuery, mockCompanyId);

      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(mockQuery.limit);
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('review.companyId = :companyId', {
        companyId: mockCompanyId,
      });
      expect(result).toEqual({
        reviews: mockReviews,
        currentPage: mockQuery.page,
        nextPage: null,
        total: 1,
      });
    });

    it('should handle pagination correctly', async () => {
      mockQueryBuilder.getManyAndCount.mockResolvedValue([mockReviews, 15]);

      const result = await service.findReviewByCompanyId({ ...mockQuery, page: 1 }, mockCompanyId);

      expect(result).toEqual({
        reviews: mockReviews,
        currentPage: 1,
        nextPage: 2,
        total: 15,
      });
    });
  });

  describe('getStatisticsReviewCompany', () => {
    const mockCompanyId = 'company-123';

    it('should return review statistics for a company', async () => {
      mockQueryBuilder.getRawOne.mockResolvedValue({ avg: 4.5, count: 10 });

      const result = await service.getStatisticsReviewCompany(mockCompanyId);

      expect(mockQueryBuilder.where).toHaveBeenCalledWith('review.companyId = :companyId', {
        companyId: mockCompanyId,
      });
      expect(result).toEqual({
        avg: 4.5,
        count: 10,
      });
    });

    it('should return default average rating when no reviews exist', async () => {
      mockQueryBuilder.getRawOne.mockResolvedValue({ avg: null, count: 0 });

      const result = await service.getStatisticsReviewCompany(mockCompanyId);

      expect(result).toEqual({
        avg: 5.0,
        count: 0,
      });
    });
  });

  describe('getMyReview', () => {
    const mockCompanyId = 'company-123';
    const mockCandidateId = 'candidate-123';
    const mockReview = {
      id: 'review-123',
      rating: 5,
      comment: 'Great!',
      companyId: mockCompanyId,
      candidateId: mockCandidateId,
    };

    it('should return review for a candidate and company', async () => {
      mockReviewRepository.findOneBy.mockResolvedValue(mockReview);

      const result = await service.getMyReview(mockCompanyId, mockCandidateId);

      expect(mockReviewRepository.findOneBy).toHaveBeenCalledWith({
        companyId: mockCompanyId,
        candidateId: mockCandidateId,
      });
      expect(result).toEqual(mockReview);
    });

    it('should return null when review not found', async () => {
      mockReviewRepository.findOneBy.mockResolvedValue(null);

      const result = await service.getMyReview(mockCompanyId, mockCandidateId);

      expect(result).toBeNull();
    });
  });

  describe('deleteReview', () => {
    const mockReviewId = 'review-123';
    const mockCandidateId = 'candidate-123';
    const mockDeleteResult = { affected: 1 };

    it('should delete a review', async () => {
      mockReviewRepository.delete.mockResolvedValue(mockDeleteResult);

      const result = await service.deleteReview(mockReviewId, mockCandidateId);

      expect(mockReviewRepository.delete).toHaveBeenCalledWith({
        id: mockReviewId,
        candidateId: mockCandidateId,
      });
      expect(result).toEqual(mockDeleteResult);
    });
  });

  describe('deleteById', () => {
    const mockReviewId = 'review-123';
    const mockReview = {
      id: mockReviewId,
      rating: 5,
      comment: 'Great!',
    };

    it('should delete a review by id', async () => {
      mockReviewRepository.findOneBy.mockResolvedValue(mockReview);
      mockReviewRepository.remove.mockResolvedValue(mockReview);

      const result = await service.deleteById(mockReviewId);

      expect(mockReviewRepository.findOneBy).toHaveBeenCalledWith({ id: mockReviewId });
      expect(mockReviewRepository.remove).toHaveBeenCalledWith(mockReview);
      expect(result).toEqual(mockReview);
    });

    it('should throw NotFoundException if review not found', async () => {
      mockReviewRepository.findOneBy.mockResolvedValue(null);

      await expect(service.deleteById(mockReviewId)).rejects.toThrow(NotFoundException);
      expect(mockReviewRepository.remove).not.toHaveBeenCalled();
    });
  });

  describe('updateReview', () => {
    const mockReviewId = 'review-123';
    const mockCandidateId = 'candidate-123';
    const mockUpdateReviewDto = {
      rating: 4,
      comment: 'Updated comment',
    };
    const mockReview = {
      id: mockReviewId,
      candidateId: mockCandidateId,
      rating: 5,
      comment: 'Old comment',
    };

    it('should update a review successfully', async () => {
      mockReviewRepository.findOneBy.mockResolvedValue(mockReview);
      mockReviewRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.updateReview(mockReviewId, mockCandidateId, mockUpdateReviewDto);

      expect(mockReviewRepository.findOneBy).toHaveBeenCalledWith({
        id: mockReviewId,
        candidateId: mockCandidateId,
      });
      expect(mockReviewRepository.update).toHaveBeenCalledWith({ id: mockReviewId }, mockUpdateReviewDto);
      expect(result).toEqual({ affected: 1 });
    });

    it('should throw NotFoundException if review not found', async () => {
      mockReviewRepository.findOneBy.mockResolvedValue(null);

      await expect(service.updateReview(mockReviewId, mockCandidateId, mockUpdateReviewDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockReviewRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('findAllReview', () => {
    const mockQuery = {
      page: 1,
      limit: 10,
      keyword: 'test',
      orderBy: OrderByReview.CREATED_AT,
      order: Order.DESC,
    };
    const mockReviews = [
      {
        id: 'review-1',
        rating: 5,
        comment: 'Great!',
        company: { name: 'Test Company' },
        candidate: { fullName: 'Test User' },
      },
    ];

    it('should return all reviews with pagination and search', async () => {
      mockQueryBuilder.getManyAndCount.mockResolvedValue([mockReviews, 1]);

      const result = await service.findAllReview(mockQuery);

      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(mockQuery.limit);
      expect(mockQueryBuilder.innerJoin).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        reviews: mockReviews,
        currentPage: mockQuery.page,
        nextPage: null,
        total: 1,
      });
    });

    it('should handle search keyword correctly', async () => {
      mockQueryBuilder.getManyAndCount.mockResolvedValue([mockReviews, 1]);

      await service.findAllReview({ ...mockQuery, keyword: 'test company' });

      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        '(company.name ILIKE :keyword OR candidate.fullName ILIKE :keyword OR review.comment ILIKE :keyword)',
        { keyword: '%test company%' },
      );
    });
  });
});
