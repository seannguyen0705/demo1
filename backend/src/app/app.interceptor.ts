import { Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';

import type { INestApplication } from '@nestjs/common';

import { ResponseInterceptor } from '@/interceptors';

export const loadInterceptors = (app: INestApplication): void => {
  app.useGlobalInterceptors(
    // new LoggingInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ResponseInterceptor(),
  );
};
