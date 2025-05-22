import { ISkill } from '../skill/interface';

interface ICandidateSkill {
  id: string;
  candidateId: string;
  skillId: string;
  skillYear: string;
  skill: ISkill;
}

interface ICreateCandidateSkill {
  skillId: string;
  skillYear: string;
}

export type { ICandidateSkill, ICreateCandidateSkill };
