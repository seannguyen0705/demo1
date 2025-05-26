import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod, UseGuards } from '@nestjs/common';
import {
  ResponseAdminDto,
  ResponseAdminDetailDto,
  CreateAdminDto,
  UpdateAdminDto,
} from './dto';
import { SelfGuard } from '../auth/guards';

export default {
  index: 'admins',
  create: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    jwtSecure: false,
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: CreateAdminDto }],
    },
  },
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    roles: [UserRole.ADMIN],
    swaggerInfo: {
      responses: [
        { status: HttpStatus.OK, type: ResponseAdminDto, isArray: true },
      ],
    },
  },

  updateMe: <IRouteParams>{
    path: '/me',
    method: RequestMethod.PUT,
    roles: [UserRole.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: UpdateAdminDto }],
    },
  },
  getById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    roles: [UserRole.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: ResponseAdminDetailDto }],
    },
  },
  updateById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.PUT,
    roles: [UserRole.ADMIN],
    extraDecorators: [UseGuards(SelfGuard)],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: UpdateAdminDto }],
    },
  },
  deleteById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.DELETE,
    roles: [UserRole.ADMIN],
    extraDecorators: [UseGuards(SelfGuard)],
    swaggerInfo: {
      responses: [
        {
          status: HttpStatus.OK,
          schema: {
            type: 'string',
            example: '353d6e1a-492b-40b1-be6e-2a08d7f782dc',
          },
        },
      ],
    },
  },
};
