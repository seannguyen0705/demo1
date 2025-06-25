import { IFile } from '../file/interface';
import { ICompany } from '../company/interface';

interface ICompanyImage {
  fileId: string;
  companyId: string;
  file: IFile;
  company: ICompany;
  id: string;
}

export type { ICompanyImage };
