export {};

declare global {
  class createUserDto {
    email: string;
    password: string;
    fullName: string;
  }

  class createCandidateDto extends createUserDto {}

  interface ErrorReponse {
    errorCode: number;
    status: number;
    message: string;
  }

  interface IFile {
    id: string;
    name: string;
    url: string;
    key: string;
    format: string;
  }

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
}
