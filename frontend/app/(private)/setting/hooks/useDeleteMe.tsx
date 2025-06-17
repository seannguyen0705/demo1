import { deleteMe } from '@/api/auth/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useDeleteMe = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMe,
    onSuccess: async (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['me'] });
      toast.success('Xóa tài khoản thành công');
      router.replace('/sign-in');
    },
  });
};
