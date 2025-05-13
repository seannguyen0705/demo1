import { Time } from '@/utils/constants';

export const config = {
  db: {
    // type: process.env.DB_TYPE || 'postgres',
    // host: process.env.DB_HOST || 'localhost',
    // port: process.env.DB_PORT || 5432,

    // username: process.env.DB_USERNAME || 'username',
    // password: process.env.DB_PASSWORD || 'password',
    // database: process.env.DB_NAME || 'dbname',

    // entities: [`${__dirname}/../../api/**/*.entity.{js,ts}`],

    logging: true,
    synchronize: true,
    // autoLoadEntities: true,
  },
  token: {
    authentication: {
      lifetime: 30 * Time.ONE_DAY,
      renewedTimes: 4,
    },
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl: process.env.GITHUB_CALLBACK_URL,
  },
};
