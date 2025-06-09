import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

export default {
  index: 'apply-jobs',
  create: <IRouteParams>{
    path: '/apply-jobs',
    method: RequestMethod.POST,
    code: HttpStatus.CREATED,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },
  findAll: <IRouteParams>{
    path: '/apply-jobs',
    method: RequestMethod.GET,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },

  getApplyJobById: <IRouteParams>{
    path: '/apply-jobs/:id',
    method: RequestMethod.GET,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },

  updateStatus: <IRouteParams>{
    path: '/apply-jobs/:id/status',
    method: RequestMethod.PUT,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },
};
