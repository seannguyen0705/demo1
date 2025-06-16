import { HttpStatus } from '@nestjs/common';

import { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';
import { UserRole } from '@/common/enums';

export default {
  index: 'staticstics',
  getStaticstics: <IRouteParams>{
    path: '/count',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: false,
  },

  staticsticsCountIn6MonthsAgo: <IRouteParams>{
    path: 'count-in-6-months-ago',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.ADMIN],
  },
};
