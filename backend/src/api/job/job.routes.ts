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
  employerFindJobs: <IRouteParams>{
    path: '/employer/jobs',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },
  findOneById: <IRouteParams>{
    path: '/jobs/:id',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: false,
  },
  candidateGetJobById: <IRouteParams>{
    path: 'candidate/jobs/:id',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },
  candidateGetJobApply: <IRouteParams>{
    path: 'candidate/job/applications',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },

  candidateGetJobSaved: <IRouteParams>{
    path: 'candidate/job/saved',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },

  getStaticsticsByJobId: <IRouteParams>{
    path: 'jobs/:id/statistics',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },

  deleteJob: <IRouteParams>{
    path: 'jobs/:id',
    method: RequestMethod.DELETE,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },

  updatePublishedJob: <IRouteParams>{
    path: 'jobs/:id',
    method: RequestMethod.PUT,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },
  updateStatus: <IRouteParams>{
    path: 'jobs/:id/status',
    method: RequestMethod.PUT,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },
};
