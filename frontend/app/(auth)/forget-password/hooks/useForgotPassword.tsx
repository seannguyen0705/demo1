import axiosInstance from '@/config/axios-config';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ForgotPasswordDto } from '@/api/auth/interface';
const forgotPassword = async ({ email, role }: ForgotPasswordDto) => {
  const reponse = await axiosInstance.post('forgot-password', {
    email,
    role,
  });
  return reponse.data;
};

export default function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
    onError: () => {
      toast.error('Có lỗi xảy ra vui lòng gửi lại sau');
    },
  });
}
