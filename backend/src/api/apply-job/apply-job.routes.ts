import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

export default {
  index: 'apply-jobs',
  create: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    code: HttpStatus.CREATED,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },
};
