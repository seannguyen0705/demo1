import { createExperience } from '@/api/experience/action';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

export default function useCreateExperience() {
  return useMutation({
    mutationFn: createExperience,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Tạo kinh nghiệm thành công');
      }
    },
  });
}
