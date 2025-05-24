import { deleteCv } from '@/api/cv/action';
import { useMutation } from '@tanstack/react-query';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { toast } from 'sonner';

export default function useDeleteCv() {
  return useMutation({
    mutationFn: deleteCv,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Xóa CV thành công');
      }
    },
  });
}
