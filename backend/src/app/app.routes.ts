import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';

export default {
  health: <IRouteParams>{
    path: '/health',
    method: RequestMethod.GET,
    jwtSecure: false,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, example: { data: 'OK' } }],
    },
  },
  sentry: <IRouteParams>{
    path: '/debug-sentry',
    method: RequestMethod.GET,
    jwtSecure: false,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, example: { data: 'OK' } }],
    },
  },
};
