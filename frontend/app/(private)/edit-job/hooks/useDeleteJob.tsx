import { deleteJob } from '@/api/job/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: (data: object) => {
      if (!isErrorResponse(data)) {
        toast.success('Tin tuyển dụng đã được xóa');
        queryClient.invalidateQueries({ queryKey: ['manage-jobs'] });
      } else {
        toast.error('Có lỗi xảy ra khi xóa bài tuyển dụng');
      }
    },
  });
}
