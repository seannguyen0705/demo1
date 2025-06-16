import { ICompany } from '../company/interface';
import { IQueryPagination, IUser } from '../interface';
import { Order, OrderByReview } from '@/utils/enums';
interface IReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  companyId: string;
  candidateId: string;
  candidate: IUser;
  company: ICompany;
}

interface QueryReview {
  reviews: IReview[];
  currentPage: number;
  nextPage: number | null;
  total: number;
}

interface StatisticReviewCompany {
  avg: string;
  count: string;
}

interface CreateReview {
  rating: number;
  comment: string;
}

interface UpdateReview {
  rating: number;
  comment: string;
}

interface IQueryReview extends IQueryPagination {
  orderBy: OrderByReview;
  order: Order;
}

export type { IReview, QueryReview, StatisticReviewCompany, CreateReview, UpdateReview, IQueryReview };
