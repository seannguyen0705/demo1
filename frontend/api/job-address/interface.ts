import { IProvince } from '@/api/province/interface';

interface IJobAddress {
  id: string;
  jobId: string;
  address: string;
  provinceId: string;
  province: IProvince;
}

export type { IJobAddress };
