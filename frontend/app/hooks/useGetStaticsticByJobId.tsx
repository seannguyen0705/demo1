import { JobStatistics } from '@/apiService/job/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const getStaticsticByJobId = async (jobId: string) => {
  const response = await axiosInstance.get<{ data: JobStatistics }>(`/jobs/${jobId}/statistics`);
  return response.data;
};

export default function useGetStaticsticByJobId(jobId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['apply-job-statistics', jobId],
    queryFn: () => getStaticsticByJobId(jobId),
  });
  return { statistics: data?.data, isLoading };
}
