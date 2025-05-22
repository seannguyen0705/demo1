interface ErrorReponse {
  errorCode: number;
  status: number;
  message: string;
}

class createUserDto {
  email: string;
  password: string;
  fullName: string;
}

class createCandidateDto extends createUserDto {}
