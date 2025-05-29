import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';
import { UpdateEmployerDto } from './dto/update-employer.dto';

export default {
  index: 'employers',
  updateStatus: <IRouteParams>{
    path: '/status/:id',
    method: RequestMethod.POST,
    roles: [UserRole.ADMIN],
    jwtSecure: true,
  },

  updateMe: <IRouteParams>{
    path: '/me',
    method: RequestMethod.PUT,
    roles: [UserRole.EMPLOYER],
    jwtSecure: true,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: UpdateEmployerDto }],
    },
  },
};
