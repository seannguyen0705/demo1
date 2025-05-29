import { deleteReview } from '@/api/review/action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { toast } from 'sonner';

interface IProps {
  companyId: string;
}
export const useDeleteMyReview = ({ companyId }: IProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId, companyId),
    onSuccess: (data: object) => {
      if (!isErrorResponse(data)) {
        toast.success('Xóa đánh giá thành công');
      } else {
        toast.error('Xóa đánh giá thất bại');
      }
      queryClient.invalidateQueries({ queryKey: ['my-review', companyId] });
    },
  });
};
