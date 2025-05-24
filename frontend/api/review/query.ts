import queryFetch from '@/utils/helpers/queryFetch';
import { QueryReview, StatisticReviewCompany } from './interface';

export const getReviewByCompanyId = async (companyId: string) => {
  const response = await queryFetch<QueryReview>(`reviews/${companyId}`, {
    method: 'GET',
  });
  return response;
};

export const getStatisticReviewCompany = async (companyId: string) => {
  const response = await queryFetch<StatisticReviewCompany>(
    `reviews/statistic/${companyId}`,
    {
      method: 'GET',
    },
  );
  return response;
};
