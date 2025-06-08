import axiosInstance from '@/config/axios-config';
import { QueryApplyJob } from '@/api/apply-job/interface';
import { useQuery } from '@tanstack/react-query';
const getApplyJob = async (queryString: string) => {
  try {
    const response = await axiosInstance.get<{ data: QueryApplyJob }>(`/apply-jobs?${queryString}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
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
  });
  return { data, isLoading };
}
