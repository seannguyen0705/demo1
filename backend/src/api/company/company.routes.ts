import { HttpStatus, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';
import { UserRole } from '@/common/enums';

export default {
  index: 'companies',
  findOneByName: <IRouteParams>{
    path: 'companies/:name',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: false,
  },
  update: <IRouteParams>{
    path: 'employer/company',
    method: RequestMethod.PUT,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },
  uploadLogo: <IRouteParams>{
    path: 'employer/company/logo',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
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
    },
  },
  uploadBackground: <IRouteParams>{
    path: 'employer/company/background',
    method: RequestMethod.POST,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
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
    },
  },
  getTop10Companies: <IRouteParams>{
    path: 'companies/top-10',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: false,
  },
};
