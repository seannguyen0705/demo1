import { useMutation } from '@tanstack/react-query';
import { registerCandidate } from '@/api/auth/action';
import { toast } from 'sonner';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useRouter } from 'next/navigation';

export default function useRegisterCandidate() {
  const router = useRouter();
  return useMutation({
    mutationFn: registerCandidate,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Đăng ký thành công');
        router.push('/sign-in');
      }
    },
  });
}
