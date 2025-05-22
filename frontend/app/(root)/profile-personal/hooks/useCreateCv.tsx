import { createCv } from '@/api/cv/action';
import { useMutation } from '@tanstack/react-query';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { toast } from 'sonner';
export default function useCreateCv() {
  return useMutation({
    mutationFn: createCv,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Tạo CV thành công');
      }
    },
  });
}
