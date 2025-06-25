import { JobType, JobStatus, SalaryType, JobLevel } from '@/utils/enums';
import { ICompany } from '@/apiService/company/interface';
import { IQueryPagination } from '@/apiService/interface';
import { IApplyJob } from '@/apiService/apply-job/interface';
import { IAddress } from '@/apiService/address/interface';
import { ISkill } from '@/apiService/skill/interface';
import { ISaveJob } from '../save-job/interfacet';

interface IJob {
  id: string;
  title: string;
  description: string;
  addresses: IAddress[];
  skills: ISkill[];
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
  expiredAt: string;
  createdAt: string;
  applyJobs: IApplyJob[];
  saveJobs: ISaveJob[];
  applyJobCount: number;
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

interface IUpdatePublishedJob {
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

interface IUpdateJob extends IUpdatePublishedJob {
  status?: JobStatus;
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
  countSeen: number;
  countInterviewing: number;
  countHired: number;
  countRejected: number;
  countTotal: number;
  viewCount: number;
}

interface IUpdateJobStatus {
  status: JobStatus;
}

export type {
  IJob,
  ICreatePublishedJob,
  ICreateDraftJob,
  IQueryJob,
  QueryJob,
  JobStatistics,
  IUpdateJob,
  IUpdatePublishedJob,
  IUpdateJobStatus,
};
