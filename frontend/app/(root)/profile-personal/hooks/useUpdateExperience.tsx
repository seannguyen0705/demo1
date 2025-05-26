import { updateExperience } from '@/api/experience/action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useUpdateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      toast.success('Cập nhật kinh nghiệm thành công');
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },
    onError: () => {
      toast.error('Cập nhật kinh nghiệm thất bại');
    },
  });
}
