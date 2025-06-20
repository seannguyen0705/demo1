import { IProvince } from '@/api/province/interface';
import { IAddress } from '../address/interface';

interface IJobAddress {
  id: string;
  jobId: string;
  addressId: string;
  address: IAddress;
}

export type { IJobAddress };
