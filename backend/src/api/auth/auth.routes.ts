import { HttpStatus, RequestMethod, UseGuards } from '@nestjs/common';

import type { IRouteParams } from '@/decorators';

import { LogInDto, LoggedInDto, RegisteredDto } from './dto';
import { RegisterCandidateDto } from './dto/registerCandidate.dto';
import JwtRefreshGuard from './guards/jwtRefresh.guard';

export default {
  index: 'auth',
  registerCandidate: <IRouteParams>{
    jwtSecure: false,
    path: '/candidate/register',
    code: HttpStatus.CREATED,
    method: RequestMethod.POST,
    swaggerInfo: {
      body: {
        type: RegisterCandidateDto,
      },
      responses: [{ status: HttpStatus.CREATED, type: RegisteredDto }],
    },
  },
  login: <IRouteParams>{
    path: '/login',
    jwtSecure: false,
    localSecure: true,
    code: HttpStatus.OK,
    method: RequestMethod.POST,
    swaggerInfo: {
      body: {
        type: LogInDto,
      },
      responses: [{ status: HttpStatus.OK, type: LoggedInDto }],
    },
  },
  refreshToken: <IRouteParams>{
    path: '/refresh-token',
    jwtSecure: false,
    code: HttpStatus.OK,
    method: RequestMethod.POST,
    extraDecorators: [UseGuards(JwtRefreshGuard)],
  },
};
