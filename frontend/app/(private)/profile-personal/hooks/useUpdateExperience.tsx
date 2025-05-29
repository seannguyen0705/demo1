import { IUpdateExperience } from '@/api/experience/interface';
import { ErrorReponse } from '@/api/interface';
import axiosInstance from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const updateExperience = async (data: IUpdateExperience) => {
  return axiosInstance.put(`experiences/${data.id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default function useUpdateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      toast.success('Cập nhật kinh nghiệm thành công');
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      toast.error(error.response?.data.message || 'Lỗi cập nhật kinh nghiệm');
    },
  });
}
