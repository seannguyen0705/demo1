import axiosInstance from '@/config/axios-config';

import { QueryJob } from '@/api/job/interface';
import { useQuery } from '@tanstack/react-query';
const getJobs = async (queryString: string) => {
  try {
    const response = await axiosInstance.get<{ data: QueryJob }>(`/jobs?${queryString}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
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
  });
  return { data, isLoading };
}
