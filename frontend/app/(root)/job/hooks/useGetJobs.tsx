import axiosInstance from '@/config/axios-config';

import { QueryJob } from '@/api/job/interface';
import { useQuery } from '@tanstack/react-query';
const getJobs = async (queryString: string) => {
  const response = await axiosInstance.get<{ data: QueryJob }>(`/jobs?${queryString}`);
  return response.data;
};

export default function useGetJobs(queryString: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['jobs', queryString],
    queryFn: () => getJobs(queryString),
  });
  return { data, isLoading };
}
