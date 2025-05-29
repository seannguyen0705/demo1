import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { QueryReviewDto } from './dto/query-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async createReview(createReviewDto: CreateReviewDto) {
    const { candidateId, companyId } = createReviewDto;
    const existingReview = await this.reviewRepository.findOne({
      where: { candidateId, companyId },
    });
    if (existingReview) {
      throw new BadRequestException('Bạn đã đánh giá công ty này rồi');
    }
    const review = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(review);
  }

  public async findReviewByCompanyId(query: QueryReviewDto, companyId: string) {
    const { page, limit } = query;
    const queryBuilder = this.reviewRepository
      .createQueryBuilder('review')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('review.createdAt', 'DESC');
    if (companyId) {
      queryBuilder.where('review.companyId = :companyId', { companyId });
    }
    const [reviews, total] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(total / limit);
    if (page + 1 > numPage) {
      return { reviews, currentPage: page, nextPage: null, total };
    }
    return { reviews, currentPage: page, nextPage: page + 1, total };
  }

  public async getStatisticsReviewCompany(companyId: string) {
    const queryBuilder = this.reviewRepository
      .createQueryBuilder('review')
      .where('review.companyId = :companyId', { companyId })
      .select(['AVG(review.rating)', 'COUNT(review.id)']);

    const result = await queryBuilder.getRawOne();
    return {
      avg: isNaN(parseFloat(result.avg)) ? 5.0 : parseFloat(result.avg).toFixed(1),
      count: result.count,
    };
  }
  public async getMyReview(companyId: string, candidateId: string) {
    const review = await this.reviewRepository.findOneBy({
      companyId,
      candidateId,
    });
    return review;
  }

  public async deleteReview(reviewId: string, candidateId: string) {
    return this.reviewRepository.delete({ id: reviewId, candidateId });
  }
  public async updateReview(reviewId: string, candidateId: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOneBy({ id: reviewId, candidateId });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return this.reviewRepository.update({ id: reviewId }, updateReviewDto);
  }
}
