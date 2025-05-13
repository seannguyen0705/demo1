import { IRouteParams } from '@/decorators';
import { RequestMethod, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './guard/google.guard';

export default {
  index: 'google',
  login: <IRouteParams>{
    path: '/login',
    method: RequestMethod.GET,
    jwtSecure: false,
    extraDecorators: [UseGuards(GoogleGuard)],
  },
  callback: <IRouteParams>{
    path: '/callback',
    method: RequestMethod.GET,
    jwtSecure: false,
    extraDecorators: [UseGuards(GoogleGuard)],
  },
};
