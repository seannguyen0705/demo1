import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

export default {
  index: 'company/jobs',
  findByCompanyId: <IRouteParams>{
    path: '/company/:companyId/jobs',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: false,
  },
};
