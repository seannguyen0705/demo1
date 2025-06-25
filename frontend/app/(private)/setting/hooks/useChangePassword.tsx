import { ChangePasswordDto } from '@/apiService/auth/interface';
import { ErrorReponse } from '@/apiService/interface';
import axiosInstance from '@/config/axios-config';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const changePassword = async (data: ChangePasswordDto) => {
  const response = await axiosInstance.post('/change-password', data);
  return response.data;
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onError: (error: AxiosError<ErrorReponse>) => {
      toast.error(error.response?.data.message || 'Lỗi đổi mật khẩu');
    },
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công');
    },
  });
};
