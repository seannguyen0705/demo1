import { IProvince } from '../province/interface';

interface IAddress {
  id: string;
  detail: string;
  provinceId: string;
  province: IProvince;
}

interface ICreateAddress {
  detail: string;
  provinceId: string;
}

export type { IAddress, ICreateAddress };
