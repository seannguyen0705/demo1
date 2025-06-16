import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

export default {
  index: 'company/reviews',
  create: <IRouteParams>{
    path: 'company/:companyId/review/me',
    method: RequestMethod.POST,
    code: HttpStatus.CREATED,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },
  getStatisticsReviewCompany: <IRouteParams>{
    path: 'company/:companyId/reviews/statistics',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: false,
  },
  getReviewByCompanyId: <IRouteParams>{
    path: 'company/:companyId/reviews',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: false,
  },
  getMyReview: <IRouteParams>{
    path: 'company/:companyId/reviews/me',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },
  deleteReview: <IRouteParams>{
    path: 'candidate/review/:reviewId',
    method: RequestMethod.DELETE,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },
  updateReview: <IRouteParams>{
    path: 'candidate/review/:reviewId',
    method: RequestMethod.PUT,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },

  getReviews: <IRouteParams>{
    path: 'reviews',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.ADMIN],
  },
  deleteReviewById: <IRouteParams>{
    path: 'reviews/:id',
    method: RequestMethod.DELETE,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.ADMIN],
  },
};
