import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod, UseInterceptors } from '@nestjs/common';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { FileInterceptor } from '@nestjs/platform-express';

export default {
  index: 'employers',
  updateStatus: <IRouteParams>{
    path: '/:id/status',
    method: RequestMethod.PUT,
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
  updateAvatar: <IRouteParams>{
    path: '/me/avatar',
    method: RequestMethod.PUT,
    roles: [UserRole.EMPLOYER],
    jwtSecure: true,
    swaggerInfo: {
      body: {
        description: 'Avatar file',
        required: true,
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      },
      responses: [{ status: HttpStatus.OK }],
    },
    extraDecorators: [UseInterceptors(FileInterceptor('file'))],
  },
};
