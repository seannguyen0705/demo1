import queryFetch from '@/utils/helpers/queryFetch';
import { IJob } from './interface';
import { TIME_CACHE } from '@/utils/constants';
export const getJobByCompanyId = async (companyId: string) => {
  const response = queryFetch<IJob[]>(`company/${companyId}/jobs`, {
    method: 'GET',
    next: {
      tags: [`company/${companyId}/jobs`],
      revalidate: TIME_CACHE,
    },
  });
  return response;
};
