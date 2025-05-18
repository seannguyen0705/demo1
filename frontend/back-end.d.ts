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
}
