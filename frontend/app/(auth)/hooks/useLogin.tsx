'use client';

import { login } from '@/api/auth/action';
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
      } else {
        if (data.data.role === UserRole.EMPLOYER) {
          router.replace('/profile-personal');
        } else {
          router.replace('/');
        }

        queryClient.removeQueries({ queryKey: ['me'] });
      }
    },
  });
}
