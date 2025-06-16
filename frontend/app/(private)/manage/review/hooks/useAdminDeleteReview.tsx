import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminDeleteReview } from '@/api/review/action';
import { toast } from 'sonner';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

export default function useAdminDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminDeleteReview,
    onSuccess: (data: object) => {
      if (!isErrorResponse(data)) {
        toast.success('Xóa đánh giá thành công');
        queryClient.invalidateQueries({ queryKey: ['reviews'] });
      } else {
        toast.error('Xóa đánh giá thất bại');
      }
    },
  });
}
