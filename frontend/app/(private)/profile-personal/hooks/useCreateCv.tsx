import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/config/axios-config';
import { ErrorReponse } from '@/api/interface';
import { AxiosError } from 'axios';

const createCv = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);

  return axiosInstance.post('candidate/cv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export default function useCreateCv() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCv,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-cv'] });
      toast.success('Tạo CV thành công');
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      toast.error(error.response?.data.message || 'Lỗi tạo CV');
    },
  });
}
