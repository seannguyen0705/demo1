import { QueryJob } from '@/api/job/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const getEmployerJobs = async (queryString: string) => {
  const response = await axiosInstance.get<{ data: QueryJob }>(`/employer/jobs?${queryString}`);
  return response.data;
};

export default function useEmployerGetJobs(queryString: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['jobs', queryString],
    queryFn: () => getEmployerJobs(queryString),
  });
  return { data, isLoading };
}
