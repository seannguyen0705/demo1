'use client';

import { login } from '@/api/auth/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error('Email hoặc mật khẩu không chính xác');
      } else {
        router.replace('/');
      }
    },
  });
}
