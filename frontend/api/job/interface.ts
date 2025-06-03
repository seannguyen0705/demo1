import { JobType, JobStatus, SalaryType, JobLevel, SortJob } from '@/utils/enums';
import { ICompany } from '@/api/company/interface';
import { IJobAddress } from '@/api/job-address/interface';
import { IJobSkill } from '@/api/job-skill/interface';
import { IQueryPagination } from '../interface';
interface IJob {
  id: string;
  title: string;
  description: string;
  jobAddresses: IJobAddress[];
  jobSkills: IJobSkill[];
  jobType: JobType;
  status: JobStatus;
  salaryType: SalaryType;
  salaryMin: number;
  jobLevel: JobLevel;
  salaryMax: number;
  companyId: string;
  company: ICompany;
  createdAt: Date;
}

interface ICreatePublishedJob {
  title: string;
  salaryType: string;
  salaryMin?: string;
  salaryMax?: string;
  jobLevel: string;
  addresses: {
    detail: string;
    provinceId: string;
  }[];
  jobType: string;
  jobExpertise: string;
  jobDomain: string;
  description: string;
  requirement: string;
  benefit: string;
  skillIds: string[];
  companyId: string;
}

interface ICreateDraftJob {
  title?: string;
  salaryType?: string;
  salaryMin?: string;
  salaryMax?: string;
  addresses?: {
    detail: string;
    provinceId: string;
  }[];
  jobLevel?: string;
  jobType?: string;
  jobExpertise?: string;
  jobDomain?: string;
  description?: string;
  requirement?: string;
  benefit?: string;
  skillIds?: string[];
  companyId?: string;
}

interface IQueryJob extends IQueryPagination {
  keyword?: string;
  provinceName?: string;
  jobType: string | null;
  minSalary: string | null;
  maxSalary: string | null;
  sort: string | null;
  jobLevel: string | null;
  status: string | null;
  job_selected: string | null;
}

interface QueryJob {
  jobs: IJob[];
  currentPage: number;
  nextPage: number | null;
  total: number;
}

export type { IJob, ICreatePublishedJob, ICreateDraftJob, IQueryJob, QueryJob };
