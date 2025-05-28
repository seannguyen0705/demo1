import { Body, Param, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import reviewRoutes from './review.routes';
import { CreateReviewDto } from './dto/create-review.dto';
import { IJwtStrategy } from '../auth/strategies';
import { QueryReviewDto } from './dto/query-review.dto';

@InjectController({
  name: reviewRoutes.index,
  isCore: true,
})
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @InjectRoute(reviewRoutes.create)
  createReview(@Body() data: CreateReviewDto, @ReqUser() user: IJwtStrategy, @Param('companyId') companyId: string) {
    return this.reviewService.createReview({
      ...data,
      candidateId: user.element.id,
      companyId,
    });
  }

  @InjectRoute(reviewRoutes.getReviewByCompanyId)
  getReviewByCompanyId(@Query() query: QueryReviewDto, @Param('companyId') companyId: string) {
    return this.reviewService.findReviewByCompanyId(query, companyId);
  }

  @InjectRoute(reviewRoutes.getStatisticsReviewCompany)
  getStatisticsReviewCompany(@Param('companyId') companyId: string) {
    return this.reviewService.getStatisticsReviewCompany(companyId);
  }

  @InjectRoute(reviewRoutes.getMyReview)
  getMyReview(@Param('companyId') companyId: string, @ReqUser() user: IJwtStrategy) {
    return this.reviewService.getMyReview(companyId, user.element.id);
  }
}
