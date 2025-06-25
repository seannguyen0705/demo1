import { AuthBy, Gender, UserRole, UserStatus } from '@/utils/enums';
import { IFile } from './file/interface';
import { ICompany } from './company/interface';
import { IExperience } from './experience/interface';
import { ICandidateSkill } from './candidate-skill/interface';
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
  id: string;
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
  title?: string;
  address?: string;
  personal_website?: string;
  introduction?: string;
  experiences?: IExperience[];
  company: ICompany;
  candidateSkills?: ICandidateSkill[];
  createdAt: string;
  allowNotify: boolean;
}

interface IUpdateUserStatus {
  status: UserStatus;
  reason?: string;
}

interface IQueryPagination {
  page?: number;
  limit?: number;
}

type SearchParams = { [key: string]: string | string[] | undefined };

export type { CreateUserDto, ErrorReponse, IUser, IQueryPagination, SearchParams, IUpdateUserStatus };
