import { IRouteParams } from '@/decorators';
import { HttpStatus } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common';
import { UserRole } from '@/common/enums';
export default {
  index: 'company/addresses',
  getCompanyAddress: <IRouteParams>{
    path: 'company/addresses',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.EMPLOYER],
  },
};
