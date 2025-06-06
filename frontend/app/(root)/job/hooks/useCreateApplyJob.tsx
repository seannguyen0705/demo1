import { ICreateApplyJob } from '@/api/apply-job/interface';
import axiosInstance from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorReponse } from '@/api/interface';
import { toast } from 'sonner';

const createApplyJob = async (data: ICreateApplyJob) => {
  return axiosInstance.post('/apply-jobs', data);
};

interface IProps {
  jobId: string;
}
export default function useCreateApplyJob({ jobId }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createApplyJob,
    onSuccess: () => {
      toast.success('Ứng tuyển thành công');
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      queryClient.invalidateQueries({ queryKey: ['candidateGetJobApply'] });
      queryClient.invalidateQueries({ queryKey: ['candidateGetJobSaved'] });
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      toast.error(error.response?.data.message || 'Lỗi ứng tuyển');
    },
  });
}
