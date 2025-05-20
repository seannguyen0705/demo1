import { User } from '../interface';

interface Employer extends User {
  workTitle: string;
}

export type { Employer };
