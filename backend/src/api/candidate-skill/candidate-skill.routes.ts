import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';

export default {
  index: 'candidate-skills',
  create: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    roles: [UserRole.CANDIDATE],
    jwtSecure: true,
  },
  delete: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.DELETE,
    roles: [UserRole.CANDIDATE],
    jwtSecure: true,
  },
  getMySkills: <IRouteParams>{
    path: '/my-skills',
    method: RequestMethod.GET,
    roles: [UserRole.CANDIDATE],
    jwtSecure: true,
  },
};
