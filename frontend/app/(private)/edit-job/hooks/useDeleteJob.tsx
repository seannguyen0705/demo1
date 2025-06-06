import { deleteJob } from '@/api/job/action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';

export default function useDeleteJob() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentPath = usePathname();
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success('Tin tuyển dụng đã được xóa');
      queryClient.invalidateQueries({ queryKey: ['manage-jobs'] });
      if (currentPath !== '/manage-jobs') {
        router.push('/manage-jobs');
      }
    },
  });
}
