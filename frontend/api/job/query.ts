import queryFetch from '@/utils/helpers/queryFetch';
import { IJob, QueryJob } from './interface';

export const getJobByCompanyId = async (companyId: string) => {
  try {
    const response = queryFetch<IJob[]>(`company/${companyId}/jobs`, {
      method: 'GET',
      next: {
        tags: [`company/${companyId}/jobs`],
      },
    });
    return response;
  } catch {
    return { data: [] };
  }
};

export const getJobById = async (id: string) => {
  try {
    const response = await queryFetch<IJob>(`jobs/${id}`, {
      method: 'GET',
    });
    return response.data;
  } catch {
    return null;
  }
};

export const getJobs = async (queryString: string) => {
  try {
    const response = queryFetch<QueryJob>(`jobs?${queryString}`, {
      method: 'GET',
    });
    return response;
  } catch {
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
