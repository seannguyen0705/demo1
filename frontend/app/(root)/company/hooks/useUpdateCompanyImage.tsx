import { updateCompanyImage } from '@/api/company-image/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface IProps {
  id: string;
  companyId: string;
}

export const useUpdateCompanyImage = ({ id, companyId }: IProps) => {
  return useMutation({
    mutationFn: (file: Blob) => updateCompanyImage(file, id, companyId),
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Upload ảnh thành công');
      }
    },
  });
};
