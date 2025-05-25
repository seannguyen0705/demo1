import { JobType, JobStatus } from '@/utils/enums';
import { ICompany } from '@/api/company/interface';
interface IJob {
  id: string;
  title: string;
  description: string;
  address: string;
  jobType: JobType;
  status: JobStatus;
  salary: string;
  companyId: string;
  company: ICompany;
}

export type { IJob };
