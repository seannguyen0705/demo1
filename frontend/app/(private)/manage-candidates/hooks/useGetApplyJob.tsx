import axiosInstance from '@/config/axios-config';
import { QueryApplyJob } from '@/apiService/apply-job/interface';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
const getApplyJob = async (queryString: string) => {
  try {
    const response = await axiosInstance.get<{ data: QueryApplyJob }>(`/apply-jobs?${queryString}`);
    return response.data.data;
  } catch {
    return {
      applyJobs: [],
      currentPage: 1,
      nextPage: null,
      total: 0,
    };
  }
};

export default function useGetApplyJob(queryString: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['manage-candidates', queryString],
    queryFn: () => getApplyJob(queryString),
    placeholderData: keepPreviousData,
  });
  return { data, isLoading };
}
