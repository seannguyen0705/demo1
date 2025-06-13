import { ISkill } from '../skill/interface';
import { SkillYear } from '@/utils/enums';
interface ICandidateSkill {
  id: string;
  candidateId: string;
  skillId: string;
  skillYear: SkillYear;
  skill: ISkill;
}

interface ICreateCandidateSkill {
  skillId: string;
  skillYear: string;
}

export type { ICandidateSkill, ICreateCandidateSkill };
