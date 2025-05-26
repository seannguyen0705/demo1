interface ISkill {
  id: string;
  name: string;
}

interface ISkillResponse {
  skills: ISkill[];
  currentPage: number;
  nextPage: number | null;
  total: number;
}

export type { ISkill, ISkillResponse };
