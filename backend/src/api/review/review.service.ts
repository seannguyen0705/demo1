import { Injectable, BadRequestException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { QueryReviewDto } from './dto/query-review.dto';

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

  public async getStatisticReviewCompany(companyId: string) {
    const queryBuilder = this.reviewRepository
      .createQueryBuilder('review')
      .where('review.companyId = :companyId', { companyId })
      .select(['AVG(review.rating)', 'COUNT(review.id)']);

    return queryBuilder.getRawOne();
  }
}
