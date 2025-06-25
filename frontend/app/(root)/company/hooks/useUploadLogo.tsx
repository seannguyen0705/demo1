import { uploadLogo } from '@/apiService/company/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface IProps {
  name: string;
}
export default function useUploadLogo({ name }: IProps) {
  return useMutation({
    mutationFn: (file: Blob) => uploadLogo(file, name),
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Upload logo thành công');
      }
    },
  });
}
