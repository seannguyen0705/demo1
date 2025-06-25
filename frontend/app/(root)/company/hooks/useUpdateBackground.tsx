import { uploadBackground } from '@/apiService/company/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface IProps {
  name: string;
}
export default function useUpdateBackground({ name }: IProps) {
  return useMutation({
    mutationFn: (file: Blob) => uploadBackground(file, name),
    onSuccess: (data) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Upload background thành công');
      }
    },
  });
}
