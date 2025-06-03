import { IJob } from '@/api/job/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const getJobById = async (jobId: string) => {
  const response = await axiosInstance.get<{ data: IJob }>(`/jobs/${jobId}`);
  return response.data;
};

export default function useGetJobById(jobId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getJobById(jobId),
    enabled: !!jobId,
  });
  return { data, isLoading };
}
