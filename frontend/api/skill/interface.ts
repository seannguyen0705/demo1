import { IQueryPagination } from '../interface';

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

interface IQuerySkill extends IQueryPagination {
  keyword: string;
  excludeSkillIds: string[];
}

export type { ISkill, ISkillResponse, IQuerySkill };
