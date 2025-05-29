import { HttpStatus, RequestMethod, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';

import { ResponseCandidateDto, ResponseCandidateDetailDto, UpdateCandidateDto } from './dto';

export default {
  index: 'candidates',
  create: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    roles: [UserRole.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: ResponseCandidateDto }],
    },
  },
  getAll: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    roles: [UserRole.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: ResponseCandidateDto, isArray: true }],
    },
  },
  updateMe: <IRouteParams>{
    path: '/me',
    method: RequestMethod.PUT,
    roles: [UserRole.CANDIDATE],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: UpdateCandidateDto }],
    },
  },
  updateAvatar: <IRouteParams>{
    path: '/me/avatar',
    method: RequestMethod.PUT,
    roles: [UserRole.CANDIDATE],
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
  getById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    roles: [UserRole.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: ResponseCandidateDetailDto }],
    },
  },
  updateById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.PUT,
    roles: [UserRole.ADMIN],
    swaggerInfo: {
      responses: [{ status: HttpStatus.OK, type: ResponseCandidateDto }],
    },
  },
  deleteById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.DELETE,
    roles: [UserRole.ADMIN],
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
