import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/config/axios-config';
import { ICreateExperience } from '@/apiService/experience/interface';
import { AxiosError } from 'axios';
import { ErrorReponse } from '@/apiService/interface';

const createExperience = async (data: ICreateExperience) => {
  return axiosInstance.post('experiences', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default function useCreateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      toast.success('Tạo kinh nghiệm thành công');
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      toast.error(error.response?.data.message || 'Lỗi tạo kinh nghiệm');
    },
  });
}
