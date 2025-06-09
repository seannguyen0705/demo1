import { ResetPasswordDto } from '@/api/auth/interface';
import axiosInstance from '@/config/axios-config';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const resetPassword = async ({ accountToken, password }: ResetPasswordDto) => {
  const response = await axiosInstance.post('/reset-password', { accountToken, password });
  return response.data;
};

export default function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onError: () => {
      toast.error('Token hết hạn');
    },
  });
}
