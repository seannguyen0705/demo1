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
  role: UserRole;
}

interface ForgotPasswordDto {
  email: string;
  role: UserRole;
}

interface ResetPasswordDto {
  password: string;
  accountToken: string;
}

interface ActiveCandidateDto {
  accountToken: string;
}

interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export type {
  LoginDto,
  TokenCookie,
  ResponseLoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  ActiveCandidateDto,
  ChangePasswordDto,
};
