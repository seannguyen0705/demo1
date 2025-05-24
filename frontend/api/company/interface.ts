import { IFile } from '../file/interface';

interface ICompany {
  name: string;
  companySize: number;
  overview: string;
  description: string;
  address: string[];
  website: string;
  logo: IFile;
  proof: IFile;
}

export type { ICompany };
