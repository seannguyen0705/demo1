import { createCv } from '@/api/cv/action';
import { useMutation } from '@tanstack/react-query';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
export default function useCreateCv() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCv,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        queryClient.invalidateQueries({ queryKey: ['my-cv'] });
        toast.success('Tạo CV thành công');
      }
    },
  });
}
