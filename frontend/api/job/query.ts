import queryFetch from '@/utils/helpers/queryFetch';
import { IJob } from './interface';

export const getJobByCompanyId = async (companyId: string) => {
  const response = queryFetch<IJob[]>(`company/${companyId}/jobs`, {
    method: 'GET',
  });
  return response;
};
