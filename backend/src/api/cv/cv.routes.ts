import { UserRole } from '@/common/enums';
import { IRouteParams } from '@/decorators';
import { HttpStatus, UseInterceptors } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export default {
  index: 'candidate/cv',
  create: <IRouteParams>{
    path: 'candidate/cv',
    method: RequestMethod.POST,
    jwtSecure: true,
    code: HttpStatus.CREATED,
    roles: [UserRole.CANDIDATE],
    extraDecorators: [UseInterceptors(FileInterceptor('file'))],
    swaggerInfo: {
      body: {
        required: true,
        schema: {
          type: 'object',
          properties: {
            file: { type: 'string', format: 'binary' },
          },
        },
      },
      responses: [{ status: HttpStatus.CREATED, type: File }],
    },
  },
  update: <IRouteParams>{
    path: 'candidate/cv/:id',
    method: RequestMethod.PUT,
    jwtSecure: true,
    code: HttpStatus.OK,
    roles: [UserRole.CANDIDATE],
    extraDecorators: [UseInterceptors(FileInterceptor('file'))],
    swaggerInfo: {
      body: {
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
    },
  },
  delete: <IRouteParams>{
    path: 'candidate/cv/:id',
    method: RequestMethod.DELETE,
    jwtSecure: true,
    code: HttpStatus.OK,
    roles: [UserRole.CANDIDATE],
    swaggerInfo: {
      params: {
        id: {
          type: String,
        },
      },
    },
  },
  getMyCv: <IRouteParams>{
    path: 'candidate/cv',
    method: RequestMethod.GET,
    jwtSecure: true,
    code: HttpStatus.OK,
    roles: [UserRole.CANDIDATE],
  },
};
