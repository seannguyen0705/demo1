import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCandidate } from '@/api/candidate/action';
import { toast } from 'sonner';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

export default function useUpdateCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCandidate,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Cập nhật thông tin thành công');
        queryClient.invalidateQueries({ queryKey: ['me'] });
      }
    },
  });
}
