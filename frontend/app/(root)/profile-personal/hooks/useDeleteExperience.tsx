import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExperience } from '@/api/experience/action';
import { toast } from 'sonner';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

export default function useDeleteExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExperience,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Xóa kinh nghiệm thành công');
        queryClient.invalidateQueries({ queryKey: ['experiences'] });
      }
    },
  });
}
