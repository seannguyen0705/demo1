import { IFile } from '../file/interface';
import { IUser } from '../interface';
import { IJob } from '../job/interface';
import { ApplyJobStatus, ApplyJobStatusDB } from '@/utils/enums';
interface ICreateApplyJob {
  jobId: string;
  fileId: string;
  fullName: string;
  phoneNumber: string;
  expectedAddress: string;
  message?: string;
  candidateId: string;
}

interface IApplyJob {
  id: string;
  jobId: string;
  fileId: string;
  fullName: string;
  phoneNumber: string;
  status: ApplyJobStatus;
  expectedAddress: string;
  message?: string;
  createdAt: string;
  file: IFile;
  job: IJob;
  candidate: IUser;
  candidateId: string;
}

interface IUpdateApplyJobStatus {
  status: ApplyJobStatusDB;
}

interface QueryApplyJob {
  applyJobs: IApplyJob[];
  currentPage: number;
  nextPage: number | null;
  total: number;
}

export type { ICreateApplyJob, IApplyJob, QueryApplyJob, IUpdateApplyJobStatus };
