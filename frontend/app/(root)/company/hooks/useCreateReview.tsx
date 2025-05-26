import { createReview } from '@/api/review/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useCreateReview() {
  return useMutation({
    mutationFn: createReview,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Đã gửi đánh giá');
      }
    },
  });
}
