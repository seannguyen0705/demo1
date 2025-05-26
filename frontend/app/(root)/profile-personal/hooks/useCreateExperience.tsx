import { createExperience } from '@/api/experience/action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

export default function useCreateExperience() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExperience,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Tạo kinh nghiệm thành công');
        queryClient.invalidateQueries({ queryKey: ['experiences'] });
      }
    },
  });
}
