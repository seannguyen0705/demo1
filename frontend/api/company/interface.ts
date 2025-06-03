import { ICompanyAddress } from '../company-address/interface';
import { IFile } from '../file/interface';

interface ICompany {
  id: string;
  name: string;
  overview: string;
  benefits: string;
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
  companyAddresses: ICompanyAddress[];
}

interface IUpdateCompany {
  size?: string;
  type?: string;
  industry?: string;
  workingDay?: string;
  workingTime?: string;
  overview?: string;
  benefits?: string;
  country?: string;
}

export type { ICompany, IUpdateCompany };
