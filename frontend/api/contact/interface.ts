import { Order, OrderByContact } from '@/utils/enums';
import { IQueryPagination } from '../interface';
import { IFile } from '../file/interface';
interface ICreateContact {
  fullName: string;
  email: string;
  title: string;
  content: string;
  fileId: string;
}

interface IContact {
  id: string;
  fullName: string;
  email: string;
  title: string;
  content: string;
  createdAt: Date;
  file: IFile;
}

interface IQueryContact extends IQueryPagination {
  orderBy: OrderByContact;
  order: Order;
}
interface QueryContact {
  contacts: IContact[];
  currentPage: number;
  nextPage: number | null;
  total: number;
}

export type { ICreateContact, IQueryContact, QueryContact, IContact };
