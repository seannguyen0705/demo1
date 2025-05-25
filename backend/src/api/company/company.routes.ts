import { HttpStatus } from '@nestjs/common';

import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';
import { UserRole } from '@/common/enums';

export default {
  index: 'companies',
  findOneByName: <IRouteParams>{
    path: '/:name',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: false,
  },
  update: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.PUT,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },
};
