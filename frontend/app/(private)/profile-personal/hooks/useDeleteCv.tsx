import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/config/axios-config';
import { ErrorReponse } from '@/apiService/interface';
import { AxiosError } from 'axios';

const deleteCv = async (id: string) => {
  return axiosInstance.delete(`candidate/cv/${id}`);
};

export default function useDeleteCv() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCv,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-cv'] });
      toast.success('Xóa CV thành công');
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      toast.error(error.response?.data.message || 'Lỗi xóa CV');
    },
  });
}
