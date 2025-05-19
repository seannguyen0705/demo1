import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';

export default {
  index: 'employers',
  updateStatus: <IRouteParams>{
    path: '/status/:id',
    method: RequestMethod.POST,
    roles: [UserRole.ADMIN],
    jwtSecure: true,
  },
};
