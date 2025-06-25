import { IAddress } from '@/apiService/address/interface';

interface IJobAddress {
  id: string;
  jobId: string;
  addressId: string;
  address: IAddress;
}

export type { IJobAddress };
