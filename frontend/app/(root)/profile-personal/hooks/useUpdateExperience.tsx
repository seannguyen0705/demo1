import { updateExperience } from '@/api/experience/action';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useUpdateExperience() {
  return useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      toast.success('Cập nhật kinh nghiệm thành công');
    },
    onError: () => {
      toast.error('Cập nhật kinh nghiệm thất bại');
    },
  });
}
