import { deleteJob } from '@/api/job/action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success('Tin tuyển dụng đã được xóa');
      queryClient.invalidateQueries({ queryKey: ['manage-jobs'] });
    },
  });
}
