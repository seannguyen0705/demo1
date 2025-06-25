import { deleteCompanyImage } from '@/apiService/company-image/action';
import { useMutation } from '@tanstack/react-query';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { toast } from 'sonner';

interface IProps {
  companyId: string;
}
export default function useDeleteCompanyImage({ companyId }: IProps) {
  return useMutation({
    mutationFn: (id: string) => deleteCompanyImage(id, companyId),
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      }
    },
  });
}
