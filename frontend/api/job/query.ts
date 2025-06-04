import queryFetch from '@/utils/helpers/queryFetch';
import { IJob, QueryJob } from './interface';

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

export const getJobs = async (queryString: string) => {
  try {
    const response = queryFetch<QueryJob>(`jobs?${queryString}`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error(error);
    return {
      data: {
        jobs: [],
        total: 0,
        currentPage: 1,
        totalPages: 1,
      },
    };
  }
};
