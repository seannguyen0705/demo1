import { CreateUserDto, IUser } from '../interface';

type CreateCandidateDto = CreateUserDto;

interface UpdateCandidateDto {
  password?: string;
  fullName?: string;
  phoneNumber?: string;
  gender?: string;
  bod?: string;
  personal_website?: string;
  address?: string;
  title?: string;
  introduction?: string;
}

interface IQueryCandidate {
  candidates: IUser[];
  currentPage: number;
  nextPage: number | null;
  total: number;
}

export type { CreateCandidateDto, UpdateCandidateDto, IQueryCandidate };
