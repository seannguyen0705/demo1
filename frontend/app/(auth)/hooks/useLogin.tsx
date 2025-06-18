'use client';

import { LoginDto, ResponseLoginDto } from '@/api/auth/interface';
import { ErrorReponse } from '@/api/interface';
import axiosInstance from '@/config/axios-config';
import { UserRole } from '@/utils/enums';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

const login = async (data: LoginDto) => {
  const response = await axiosInstance.post<{ data: ResponseLoginDto }>('/login', data);
  return response.data;
};

export default function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.data.role === UserRole.EMPLOYER) {
        router.replace('/profile-personal');
        router.refresh();
      } else {
        router.replace('/');
        router.refresh();
      }
      queryClient.invalidateQueries({ queryKey: ['my-review'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['candidate-job'] });
      queryClient.invalidateQueries({ queryKey: ['manage-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['manage-candidates'] });
      queryClient.invalidateQueries({ queryKey: ['candidateGetJobApply'] });
      queryClient.invalidateQueries({ queryKey: ['candidateGetJobSaved'] });
      queryClient.invalidateQueries({ queryKey: ['candidateGetJobById'] });
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      toast.error(error.response?.data.message || 'Đăng nhập thất bại');
    },
  });
}
