import { UserRole } from '@/common/enums';
import { UseInterceptors } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export default {
  index: 'company/images',
  create: <IRouteParams>{
    path: 'employer/company/images',
    method: RequestMethod.POST,
    jwtSecure: true,
    code: HttpStatus.CREATED,
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
  update: <IRouteParams>{
    path: 'employer/company/images/:id',
    method: RequestMethod.PUT,
    jwtSecure: true,
    code: HttpStatus.OK,
    roles: [UserRole.EMPLOYER],
  },
  delete: <IRouteParams>{
    path: 'employer/company/images/:id',
    method: RequestMethod.DELETE,
    jwtSecure: true,
    code: HttpStatus.OK,
    roles: [UserRole.EMPLOYER],
  },
  getCompanyImage: <IRouteParams>{
    path: 'company/:companyId/images',
    method: RequestMethod.GET,
    jwtSecure: false,
    code: HttpStatus.OK,
  },
};
