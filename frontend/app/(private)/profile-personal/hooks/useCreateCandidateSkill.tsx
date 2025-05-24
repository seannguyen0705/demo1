import { addSkill } from '@/api/candidate-skill/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateCandidateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSkill,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        queryClient.invalidateQueries({
          queryKey: ['skills'],
        });
        toast.success('Tạo kĩ năng thành công');
      }
    },
  });
};
