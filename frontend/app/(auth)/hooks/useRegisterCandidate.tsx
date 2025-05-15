import { useMutation } from '@tanstack/react-query';
import { registerCandidate } from '@/api/auth/action';
import { toast } from 'sonner';
import EXCEPTION_CODE from '@/utils/constants/exception';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

export default function useRegisterCandidate() {
  return useMutation({
    mutationFn: registerCandidate,
    onSuccess: (data: unknown) => {
      if (isErrorResponse(data)) {
        if (data.errorCode === EXCEPTION_CODE.USER_ALREADY_EXISTS_CODE) {
          toast.error('Email đã có người sử dụng');
        } else {
          toast.error('Lỗi hệ thống');
        }
      } else {
        toast.success('Đăng ký thành công');
      }
    },
  });
}
