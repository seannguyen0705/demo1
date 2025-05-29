import { useMutation } from '@tanstack/react-query';
import { createCompanyImage } from '@/api/company-image/action';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { toast } from 'sonner';

interface Iprops {
  companyId: string;
}
export default function useCreateCompanyImage({ companyId }: Iprops) {
  return useMutation({
    mutationFn: (file: Blob) => createCompanyImage(file, companyId),
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      }
    },
  });
}
