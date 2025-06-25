import { createReview } from '@/apiService/review/action';
import { CreateReview } from '@/apiService/review/interface';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface IProps {
  companyId: string;
}
export default function useCreateReview({ companyId }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReview) => createReview(data, companyId),
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Đã gửi đánh giá');
        queryClient.invalidateQueries({ queryKey: ['my-review', companyId] });
      }
    },
  });
}
