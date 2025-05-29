import queryFetch from '@/utils/helpers/queryFetch';
import { QueryReview, StatisticReviewCompany } from './interface';

export const getReviewByCompanyId = async (companyId: string) => {
  const response = await queryFetch<QueryReview>(`company/reviews/${companyId}`, {
    method: 'GET',
    next: {
      tags: [`company/${companyId}/reviews`],
    },
  });
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
