import { deleteCv } from '@/api/cv/action';
import { useMutation } from '@tanstack/react-query';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
export default function useDeleteCv() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCv,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        queryClient.invalidateQueries({ queryKey: ['my-cv'] });
        toast.success('Xóa CV thành công');
      }
    },
  });
}
