import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus } from '@nestjs/common';

import { RequestMethod } from '@nestjs/common';

export default {
  index: 'save-jobs',
  createSaveJob: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    code: HttpStatus.CREATED,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },
  deleteSaveJob: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.DELETE,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },
};
