import { IFile } from '../file/interface';
import { IJob } from '../job/interface';

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
  expectedAddress: string;
  message?: string;
  createdAt: string;
  file: IFile;
  job: IJob;
}

export type { ICreateApplyJob, IApplyJob };
