import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

export default {
  index: 'company/reviews',
  create: <IRouteParams>{
    path: 'company/reviews',
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
    path: 'company/:companyId/reviews/my-review',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },
};
