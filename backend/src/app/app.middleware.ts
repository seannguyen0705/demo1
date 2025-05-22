import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { VersioningType } from '@nestjs/common';

import type { INestApplication } from '@nestjs/common';

export const loadMiddlewares = (app: INestApplication): void => {
  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.enableCors({
    origin: ['http://localhost:3000'], // allow other origin access to API
    credentials: true, //Access-Control-Allow-Credentials: true response header.
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  /**
   * ! If you use GraphQL, we can have some problems
   * * We should add options below, then it will work okay
   * contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false
   * crossOriginEmbedderPolicy: (process.env.NODE_ENV === 'production') ? undefined : false
   */
  app.use(helmet());

  app.use(compression());

  app.use(cookieParser());
};
