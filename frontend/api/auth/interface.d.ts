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
}
