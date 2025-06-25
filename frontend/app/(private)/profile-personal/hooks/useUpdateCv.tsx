import axiosInstance from '@/config/axios-config';
import { ErrorReponse } from '@/apiService/interface';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const updateCv = async (data: { id: string; file: Blob }) => {
  const formData = new FormData();
  formData.append('file', data.file);

  return axiosInstance.put(`candidate/cv/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default function useUpdateCv() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCv,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-cv'] });
      toast.success('Cập nhật CV thành công');
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      toast.error(error.response?.data.message || 'Lỗi cập nhật CV');
    },
  });
}
