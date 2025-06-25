'use client';

import { login } from '@/apiService/auth/action';

import { UserRole } from '@/utils/enums';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['my-review'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['candidate-job'] });
      queryClient.invalidateQueries({ queryKey: ['manage-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['manage-candidates'] });
      queryClient.invalidateQueries({ queryKey: ['candidateGetJobApply'] });
      queryClient.invalidateQueries({ queryKey: ['candidateGetJobSaved'] });
      queryClient.invalidateQueries({ queryKey: ['candidateGetJobById'] });
      if (data.data.role === UserRole.EMPLOYER) {
        router.replace('/profile-personal');
        router.refresh();
      } else {
        router.replace('/');
        router.refresh();
      }
    },
  });
}
