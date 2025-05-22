import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';

export default {
  index: 'skills',
  create: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    code: HttpStatus.CREATED,
    jwtSecure: true,
    roles: [UserRole.ADMIN],
  },
  update: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.PUT,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.ADMIN],
  },
  delete: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.DELETE,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.ADMIN],
  },
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.ADMIN, UserRole.CANDIDATE],
  },
  mySkill: <IRouteParams>{
    path: '/my-skill',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },
};
