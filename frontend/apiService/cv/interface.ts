import { IFile } from '../file/interface';

interface ICv {
  id: string;
  candidateId: string;
  updatedAt: string;
  file: IFile;
  createdAt: string;
}

export type { ICv };
