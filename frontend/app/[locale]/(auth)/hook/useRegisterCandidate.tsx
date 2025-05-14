import { useMutation } from '@tanstack/react-query';
import { registerCandidate } from '@/api/auth/action';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import EXCEPTION_CODE from '@/util/constant/exception';
import { isErrorResponse } from '@/util/helper/isErrorResponse';

export default function useRegisterCandidate() {
  const tException = useTranslations('exception');
  const tToast = useTranslations('register-page.toast');
  return useMutation({
    mutationFn: registerCandidate,
    onSuccess: (data: unknown) => {
      if (isErrorResponse(data)) {
        if (data.code === EXCEPTION_CODE.USER_ALREADY_EXISTS_CODE) {
          toast.error(tException('10006'));
        } else {
          toast.error(tException('10000'));
        }
      } else {
        toast.success(tToast('register-success'));
      }
    },
  });
}
