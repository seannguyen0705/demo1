import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

export default {
  index: 'jobs',
  findByCompanyId: <IRouteParams>{
    path: '/company/:companyId/jobs',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: false,
  },
  createDraftJob: <IRouteParams>{
    path: '/jobs/draft',
    method: RequestMethod.POST,
    code: HttpStatus.CREATED,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },
  createPublishedJob: <IRouteParams>{
    path: '/jobs/published',
    method: RequestMethod.POST,
    code: HttpStatus.CREATED,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },
  findJobs: <IRouteParams>{
    path: '/jobs',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: false,
  },
};
