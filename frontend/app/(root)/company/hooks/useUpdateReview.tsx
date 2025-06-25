import { UpdateReview } from '@/apiService/review/interface';
import { updateReview } from '@/apiService/review/action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { toast } from 'sonner';

interface IProps {
  companyId: string;
  reviewId: string;
}

export default function useUpdateReview({ companyId, reviewId }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateReview) => updateReview(data, reviewId, companyId),
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Đã cập nhật đánh giá');
        queryClient.invalidateQueries({ queryKey: ['my-review', companyId] });
      }
    },
  });
}
