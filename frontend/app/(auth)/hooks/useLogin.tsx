'use client';

import { login } from '@/api/auth/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

export default function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        queryClient.removeQueries({ queryKey: ['me'] });
      }
    },
  });
}
