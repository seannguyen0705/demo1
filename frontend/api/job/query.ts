import queryFetch from '@/utils/helpers/queryFetch';
import { IJob, QueryJob } from './interface';
import { notFound } from 'next/navigation';

export const getJobByCompanyId = async (companyId: string) => {
  try {
    const response = queryFetch<IJob[]>(`company/${companyId}/jobs`, {
      method: 'GET',
      next: {
        tags: [`company/${companyId}/jobs`],
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
};

export const getJobById = async (id: string) => {
  try {
    const response = queryFetch<IJob>(`jobs/${id}`, {
      method: 'GET',
      next: {
        tags: [`jobs/${id}`],
      },
    });
    return response;
  } catch (error) {
    return { data: null };
  }
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
