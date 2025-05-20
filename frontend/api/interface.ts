import { AuthBy, Gender, UserRole, UserStatus } from '@/utils/enums';
import { IFile } from './file/interface';

interface ErrorReponse {
  errorCode: number;
  status: number;
  message: string;
}

interface CreateUserDto {
  email: string;
  password: string;
  fullName: string;
}

interface IUser {
  email: string;
  fullName: string;
  phoneNumber?: string;
  gender?: Gender;
  bod?: Date;
  role: UserRole;
  countViolation: number;
  avatar?: IFile;
  status: UserStatus;
  authBy?: AuthBy;
  avatar_url?: string;
  workTitle?: string;
}

export type { CreateUserDto, ErrorReponse, IUser };
