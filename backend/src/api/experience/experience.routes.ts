import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UserRole } from '@/common/enums';

export default {
  index: 'experiences',
  create: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    code: HttpStatus.CREATED,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
    swaggerInfo: {
      body: {
        type: CreateExperienceDto,
      },
    },
  },
  findMyExperiences: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
    swaggerInfo: {
      responses: [
        {
          status: HttpStatus.OK,
        },
      ],
    },
  },
  delete: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.DELETE,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },
  update: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.PUT,
    code: HttpStatus.OK,
    jwtSecure: true,
    roles: [UserRole.CANDIDATE],
  },
};
