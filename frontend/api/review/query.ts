import queryFetch from '@/utils/helpers/queryFetch';
import { IQueryReview, QueryReview, StatisticReviewCompany } from './interface';
import { OrderByReview } from '@/utils/enums';
import { Order } from '@/utils/enums';
export const getReviewByCompanyId = async (companyId: string, query: IQueryReview) => {
  const { orderBy = OrderByReview.CREATED_AT, order = Order.DESC, page = 1, limit = 10 } = query;
  const response = await queryFetch<QueryReview>(
    `company/${companyId}/reviews?orderBy=${orderBy}&order=${order}&page=${page}&limit=${limit}`,
    {
      method: 'GET',
      next: {
        tags: [`company/${companyId}/reviews`],
      },
    },
  );
  return response;
};

export const getStatisticsReviewCompany = async (companyId: string) => {
  const response = await queryFetch<StatisticReviewCompany>(`company/${companyId}/reviews/statistics`, {
    method: 'GET',
    next: {
      tags: [`company/${companyId}/reviews/statistics`],
    },
  });
  return response;
};
