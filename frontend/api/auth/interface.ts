import { UserRole } from '@/utils/enums';

interface LoginDto {
  email: string;
  password: string;
  role: UserRole;
}

interface TokenCookie {
  token: string;
  cookie: string;
  ttl: number;
}

interface ResponseLoginDto {
  accessTokenCookie: TokenCookie;
  refreshTokenCookie: TokenCookie;
  roleCookie: {
    cookie: string;
    ttl: number;
    role: UserRole;
  };
}

export type { LoginDto, TokenCookie, ResponseLoginDto };
