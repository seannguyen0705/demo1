import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';
const getApplyJobByJobId = async (jobId: string) => {
  const response = await axiosInstance.get(`/jobs/${jobId}/apply-job`);
  return response.data;
};

export default function useGetApplyJobByJobId(jobId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['apply-job', jobId],
    queryFn: () => getApplyJobByJobId(jobId),
  });
  return { data, isLoading };
}
