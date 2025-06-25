import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/config/axios-config';
import { AxiosError } from 'axios';
import { ErrorReponse } from '@/apiService/interface';
import { toast } from 'sonner';

const deleteSaveJob = async (jobId: string) => {
  const response = await axiosInstance.delete(`/save-jobs/${jobId}`);
  return response.data;
};

export default function useDeleteSaveJob(jobId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSaveJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      queryClient.invalidateQueries({ queryKey: ['candidateGetJobSaved'] });
      queryClient.invalidateQueries({ queryKey: ['candidate-job', jobId] });
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      toast.error(error.response?.data.message || 'Lỗi, vui lòng thử lại');
    },
  });
}
