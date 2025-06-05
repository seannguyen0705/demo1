import { ICreateSaveJob } from '@/api/save-job/interfacet';
import axiosInstance from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorReponse } from '@/api/interface';
import { toast } from 'sonner';

const createSaveJob = async (data: ICreateSaveJob) => {
  const response = await axiosInstance.post('/save-jobs', data);
  return response.data;
};

export default function useCreateSaveJob(jobId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSaveJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      queryClient.invalidateQueries({ queryKey: ['candidateGetJobSaved'] });
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      toast.error(error.response?.data.message || 'Lỗi lưu việc làm');
    },
  });
}
