import { useMutation } from '@tanstack/react-query';
import { registerCandidate } from '@/api/auth/action';
import { toast } from 'sonner';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

export default function useRegisterCandidate() {
  return useMutation({
    mutationFn: registerCandidate,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      }
    },
  });
}
