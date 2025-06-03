import { HttpStatus } from '@nestjs/common';

import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';

export default {
  index: 'staticstics/count',
  getStaticstics: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: false,
  },
};
