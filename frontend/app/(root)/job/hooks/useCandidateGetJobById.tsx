import { IJob } from '@/api/job/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const candidateGetJobById = async (jobId: string) => {
  try {
    const response = await axiosInstance.get<{ data: IJob }>(`candidate/jobs/${jobId}`);
    return response.data.data;
  } catch (error) {
    return null;
  }
};

export default function useCandidateGetJobById(jobId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['candidate-job', jobId],
    queryFn: () => candidateGetJobById(jobId),
    enabled: !!jobId,
  });
  return { data, isLoading };
}
