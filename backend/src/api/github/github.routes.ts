import { IRouteParams } from '@/decorators';
import { UseGuards } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common';

import GithubGuard from './guards/github.guard';

export default {
  index: 'github',
  login: <IRouteParams>{
    path: '/login',
    method: RequestMethod.GET,
    jwtSecure: false,
    extraDecorators: [UseGuards(GithubGuard)],
  },

  callback: <IRouteParams>{
    path: '/callback',
    method: RequestMethod.GET,
    jwtSecure: false,
    extraDecorators: [UseGuards(GithubGuard)],
  },
};
