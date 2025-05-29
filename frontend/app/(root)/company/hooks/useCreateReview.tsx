import { createReview } from '@/api/review/action';
import { CreateReview } from '@/api/review/interface';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface IProps {
  companyId: string;
}
export default function useCreateReview({ companyId }: IProps) {
  return useMutation({
    mutationFn: (data: CreateReview) => createReview(data, companyId),
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Đã gửi đánh giá');
      }
    },
  });
}
