import { JobType, JobStatus, SalaryType, JobLevel } from '@/utils/enums';
import { ICompany } from '@/api/company/interface';
import { IJobAddress } from '@/api/job-address/interface';
import { IJobSkill } from '@/api/job-skill/interface';
import { IQueryPagination } from '../interface';
import { IApplyJob } from '../apply-job/interface';
import { ISaveJob } from '../save-job/interfacet';

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
  requirement: string;
  jobExpertise: string;
  jobDomain: string;
  salaryMax: number;
  benefit: string;
  companyId: string;
  company: ICompany;
  createdAt: Date;
  applyJobs: IApplyJob[];
  saveJobs: ISaveJob[];
}

interface ICreatePublishedJob {
  title: string;
  salaryType: string;
  salaryMin?: string;
  salaryMax?: string;
  jobLevel: string;
  addressIds: string[];
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
  addressIds?: string[];
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

interface IUpdateJob {
  title?: string;
  addressIds?: string[];
  salaryMin?: string;
  salaryMax?: string;
  jobType?: string;
  jobLevel?: string;
  jobExpertise?: string;
  jobDomain?: string;
  description?: string;
  requirement?: string;
  benefit?: string;
  skillIds?: string[];
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

interface JobStatistics {
  countNew: number;
  countProcessing: number;
  countInterviewing: number;
  countHired: number;
  countRejected: number;
  countTotal: number;
  viewCount: number;
}

export type { IJob, ICreatePublishedJob, ICreateDraftJob, IQueryJob, QueryJob, JobStatistics, IUpdateJob };
