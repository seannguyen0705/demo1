import axiosInstance from '@/config/axios-config';

import { QueryJob } from '@/api/job/interface';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
const getJobs = async (queryString: string) => {
  try {
    const response = await axiosInstance.get<{ data: QueryJob }>(`/jobs?${queryString}`);
    return response.data.data;
  } catch {
    return {
      jobs: [],
      currentPage: 1,
      nextPage: null,
      total: 0,
    };
  }
};

export default function useGetJobs(queryString: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['jobs', queryString],
    queryFn: () => getJobs(queryString),
    placeholderData: keepPreviousData,
  });
  return { data, isLoading };
}
