import { QueryJob } from '@/apiService/job/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

const getEmployerJobs = async (queryString: string) => {
  try {
    const response = await axiosInstance.get<{ data: QueryJob }>(`/employer/jobs?${queryString}`);
    return response.data.data;
  } catch {
    return {
      jobs: [],
      currentPage: 1,
      total: 0,
      nextPage: null,
    };
  }
};

export default function useEmployerGetJobs(queryString: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['manage-jobs', queryString],
    queryFn: () => getEmployerJobs(queryString),
    placeholderData: keepPreviousData,
  });
  return { data, isLoading };
}
