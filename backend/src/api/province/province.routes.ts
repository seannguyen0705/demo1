import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common';

export default {
  index: 'provinces',
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: false,
  },
};
