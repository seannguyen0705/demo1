import { IApplyJob } from '@/apiService/apply-job/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const getApplyJobById = async (applyJobId: string) => {
  const response = await axiosInstance.get<{ data: IApplyJob }>(`/apply-jobs/${applyJobId}`);
  return response.data.data;
};

export default function useGetApplyJobById(applyJobId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['apply-job', applyJobId],
    queryFn: () => getApplyJobById(applyJobId),
    enabled: !!applyJobId,
  });
  return { applyJob: data, isLoading };
}
