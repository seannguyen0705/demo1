import { IRouteParams } from '@/decorators';
import { HttpStatus, RequestMethod, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export default {
  index: 'file',
  upload: <IRouteParams>{
    path: '/:folder',
    method: RequestMethod.POST,
    jwtSecure: false,
    code: HttpStatus.CREATED,
    extraDecorators: [UseInterceptors(FileInterceptor('file'))],
    swaggerInfo: {
      params: {
        folder: {
          type: String,
          description: 'Folder to upload the file to',
        },
      },
      body: {
        type: File,
        description: 'File to upload',
      },
      responses: [{ status: HttpStatus.CREATED, type: File }],
    },
  },
  delete: <IRouteParams>{
    path: '/:id',
    method: RequestMethod.DELETE,
    jwtSecure: false,
    code: HttpStatus.OK,
    swaggerInfo: {
      params: {
        id: {
          type: String,
          description: 'Id of the file to delete',
        },
      },
      responses: [{ status: HttpStatus.OK, type: File }],
    },
  },
};
