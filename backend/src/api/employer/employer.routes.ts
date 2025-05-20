import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';
import { ResponseEmployerDetailDto } from './dto/response-employer.dto';

export default {
  index: 'employers',
  updateStatus: <IRouteParams>{
    path: '/status/:id',
    method: RequestMethod.POST,
    roles: [UserRole.ADMIN],
    jwtSecure: true,
  },
  getMe: <IRouteParams>{
    path: '/me',
    method: RequestMethod.GET,
    roles: [UserRole.EMPLOYER],
    jwtSecure: true,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: ResponseEmployerDetailDto }],
    },
  },
};
