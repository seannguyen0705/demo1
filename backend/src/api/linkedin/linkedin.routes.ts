import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';

export default {
  index: 'linkedin',
  login: <IRouteParams>{
    path: '/login',
    method: RequestMethod.GET,
    jwtSecure: false,
  },
  callback: <IRouteParams>{
    path: '/callback',
    method: RequestMethod.GET,
    jwtSecure: false,
  },
};
