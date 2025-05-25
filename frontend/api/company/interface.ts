import { IFile } from '../file/interface';

interface ICompany {
  id: string;
  name: string;
  overview: string;
  description: string;
  address: string[];
  website: string;
  logo: IFile;
  proof: IFile;
  background: IFile;
  backgroundId: string;
  size: string;
  type: string;
  industry: string;
  workingDay: string;
  workingTime: string;
  country: string;
  employerId: string;
}

interface IUpdateCompany {
  size?: string;
  type?: string;
  industry?: string;
  workingDay?: string;
  workingTime?: string;
  overview?: string;
  description?: string;
  country?: string;
}

export type { ICompany, IUpdateCompany };
