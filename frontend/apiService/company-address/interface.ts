import { IAddress } from '../address/interface';

interface ICompanyAddress {
  id: string;
  companyId: string;
  addressId: string;
  address: IAddress;
}

export type { ICompanyAddress };
