import { JobType, JobStatus, SalaryType, SalaryUnit } from '@/utils/enums';
import { ICompany } from '@/api/company/interface';
interface IJob {
  id: string;
  title: string;
  description: string;
  address: string;
  jobType: JobType;
  status: JobStatus;
  salaryType: SalaryType;
  salaryMin: number;
  salaryMax: number;
  salaryUnit: SalaryUnit;
  companyId: string;
  company: ICompany;
}

interface ICreatePublishedJob {
  title: string;
  salaryType: string;
  salaryMin?: string;
  salaryMax?: string;
  salaryUnit: string;
  address: string[];
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
  salaryUnit?: string;
  address?: string[];
  jobType?: string;
  jobExpertise?: string;
  jobDomain?: string;
  description?: string;
  requirement?: string;
  benefit?: string;
  skillIds?: string[];
  companyId?: string;
}

export type { IJob, ICreatePublishedJob, ICreateDraftJob };
