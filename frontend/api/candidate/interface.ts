import { AuthBy } from '@/utils/enums';
import { CreateUserDto, User } from '../interface';

type CreateCandidateDto = CreateUserDto;

interface Candidate extends User {
  authBy: AuthBy;
  avatar_url: string;
}

export type { CreateCandidateDto, Candidate };
