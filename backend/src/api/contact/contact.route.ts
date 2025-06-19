import type { IRouteParams } from '@/decorators';
import { RequestMethod } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { QueryContactDto } from './dto/query-contact.dto';
import { UserRole } from '@/common/enums';
export default {
  index: 'contacts',
  createContact: <IRouteParams>{
    path: '/',
    method: RequestMethod.POST,
    jwtSecure: false,
    swaggerInfo: {
      body: {
        type: CreateContactDto,
      },
    },
  },

  getContacts: <IRouteParams>{
    path: '/',
    method: RequestMethod.GET,
    jwtSecure: true,
    roles: [UserRole.ADMIN],
    swaggerInfo: {
      query: {
        type: QueryContactDto,
      },
    },
  },
  deleteContact: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.DELETE,
    jwtSecure: true,
    roles: [UserRole.ADMIN],
    swaggerInfo: {
      params: {
        type: String,
      },
    },
  },

  getContactById: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.GET,
    jwtSecure: true,
    roles: [UserRole.ADMIN],
  },
};
