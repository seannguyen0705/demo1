import { useMutation } from '@tanstack/react-query';
import { registerBusiness } from '@/api/auth/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { toast } from 'sonner';

export default function useRegisterBusiness() {
  return useMutation({
    mutationFn: registerBusiness,
    onSuccess: (data: unknown) => {
      if (isErrorResponse(data)) {
        console.log(data);
        toast.error(data.message);
      } else {
        toast.success('Đăng ký thành công, vui lòng đợi xác thực tài khoản');
      }
    },
  });
}
