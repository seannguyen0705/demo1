import queryFetch from '@/utils/helpers/queryFetch';
import { IJob } from './interface';

export const getJobByCompanyId = async (companyId: string) => {
  const response = queryFetch<IJob[]>(`company/${companyId}/jobs`, {
    method: 'GET',
    next: {
      tags: [`company/${companyId}/jobs`],
    },
  });
  return response;
};

export const getJobById = async (id: string) => {
  const response = queryFetch<IJob>(`jobs/${id}`, {
    method: 'GET',
  });
  return response;
};
