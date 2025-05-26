import { updateCv } from '@/api/cv/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useUpdateCv() {
  return useMutation({
    mutationFn: updateCv,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Cập nhật CV thành công');
      }
    },
  });
}
