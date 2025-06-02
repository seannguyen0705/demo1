import { JobType, JobStatus, SalaryType, SalaryUnit } from '@/utils/enums';
import { ICompany } from '@/api/company/interface';
import { IJobAddress } from '@/api/job-address/interface';
interface IJob {
  id: string;
  title: string;
  description: string;
  jobAddresses: IJobAddress[];
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
  salaryUnit?: string;
  addresses?: {
    detail: string;
    provinceId: string;
  }[];
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
