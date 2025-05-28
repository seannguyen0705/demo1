import { updateCompany } from '@/api/company/action';
import { IUpdateCompany } from '@/api/company/interface';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

interface IProps {
  name: string;
}
export default function useUpdateCompanyInfo({ name }: IProps) {
  return useMutation({
    mutationFn: (data: IUpdateCompany) => updateCompany(data, name),
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Cập nhật thông tin thành công');
      }
    },
  });
}
