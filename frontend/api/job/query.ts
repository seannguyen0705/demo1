import queryFetch from '@/utils/helpers/queryFetch';
import { IJob } from './interface';

export const getJobByCompanyId = async (companyId: string) => {
  const response = queryFetch<IJob[]>(`jobs/company/${companyId}`, {
    method: 'GET',
  });
  return response;
};
