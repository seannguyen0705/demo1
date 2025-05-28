import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserRole } from '@/utils/enums';
import { updateUser } from '@/api/action';
import { UpdateCandidateDto } from '@/api/candidate/interface';
import { UpdateEmployerDto } from '@/api/employer/interface';
import { toast } from 'sonner';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

interface IProps {
  role: UserRole;
}
export default function useUpdateUser({ role }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCandidateDto | UpdateEmployerDto) => updateUser(role, data),
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Cập nhật thông tin thành công');
        queryClient.invalidateQueries({ queryKey: ['me'] });
      }
    },
  });
}
