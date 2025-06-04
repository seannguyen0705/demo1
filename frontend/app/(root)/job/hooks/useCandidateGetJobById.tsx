import { IJob } from '@/api/job/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const candidateGetJobById = async (jobId: string) => {
  const response = await axiosInstance.get<{ data: IJob }>(`candidate/jobs/${jobId}`);
  return response.data;
};

export default function useCandidateGetJobById(jobId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => candidateGetJobById(jobId),
    enabled: !!jobId,
  });
  return { data, isLoading };
}
