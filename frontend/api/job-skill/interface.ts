import { IJob } from '../job/interface';
import { ISkill } from '../skill/interface';

interface IJobSkill {
  job: IJob;
  skill: ISkill;
  jobId: string;
  skillId: string;
}

export type { IJobSkill };
