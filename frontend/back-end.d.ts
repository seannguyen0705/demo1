export {};

declare global {
  class createUserDto {
    email: string;
    password: string;
    fullName: string;
  }

  class createCandidateDto extends createUserDto {}

  interface ErrorReponse {
    code: number;
    status: number;
    message: string;
  }
}
