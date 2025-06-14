import { adminDeleteJob } from '@/api/job/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface IProps {
  id: string;
}
export default function useAdminDeleteJob({ id }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reason: string) => adminDeleteJob(id, reason),
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Tin tuyển dụng đã được xóa');
        queryClient.invalidateQueries({ queryKey: ['admin/jobs'] });
      }
    },
  });
}
