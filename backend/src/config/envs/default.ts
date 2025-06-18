import { Time } from '@/utils/constants';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const config = {
  db: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,

    username: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dbname',

    entities: [`${__dirname}/../../api/**/*.entity.{js,ts}`],
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    logging: false,
    synchronize: false,
    autoLoadEntities: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    resetPasswordSecret: process.env.JWT_RESET_PASSWORD_SECRET,
    activeAccountSecret: process.env.JWT_ACTIVE_ACCOUNT_SECRET,
  },
  code: {
    resetPassword: {
      lifetime: 5 * Time.ONE_MINUTE,
    },
    activeAccount: {
      lifetime: 5 * Time.ONE_MINUTE,
    },
  },
  email: {
    transport: {
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.MAIL_USERNAME || 'username',
        pass: process.env.MAIL_PASSWORD || 'password',
      },
      secure: true,
      ignoreTLS: true,
    },
    defaults: {
      from: '"No Reply" <no-reply@localhost>',
    },
    template: {
      dir: 'src/api/email/templates/',
      adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl: process.env.GITHUB_CALLBACK_URL,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
  linkedin: {
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackUrl: process.env.LINKEDIN_CALLBACK_URL,
  },
  swagger: {
    siteTitle: 'Basic NestJS Template | Documentation',
    title: 'Basic NestJS Template | Documentation',
    description: 'The Basic NestJS Template API Documentation',
    version: '1.0',
    bearerAuth: {
      type: 'http',
      in: 'Header',
      scheme: 'Bearer',
      bearerFormat: 'Bearer',
      name: 'Authorization',
      description: 'Please enter JWT token',
    },
  },
};
