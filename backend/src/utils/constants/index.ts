import Time from './time';
import Regex from './regex';
import Exception from './exception';

const ROLES_KEY = 'roles';
const IS_PUBLIC_KEY = 'isPublic';
export const JWT_REFRESH_TOKEN = 'jwt-refresh-token';
const BATCH_SIZE = 100;

const Env = {
  STAGING: 'staging',
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};

export { ROLES_KEY, IS_PUBLIC_KEY, Env, Time, Regex, Exception, BATCH_SIZE };
