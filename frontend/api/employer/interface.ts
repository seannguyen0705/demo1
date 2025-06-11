import { IUser } from '../interface';

interface UpdateEmployerDto {
  password?: string;
  fullName?: string;
  phoneNumber?: string;
  gender?: string;
  bod?: string;
  personal_website?: string;
  address?: string;
  title?: string;
}

interface QueryEmployer {
  employers: IUser[];
  currentPage: number;
  nextPage: number | null;
  total: number;
}

export type { UpdateEmployerDto, QueryEmployer };
