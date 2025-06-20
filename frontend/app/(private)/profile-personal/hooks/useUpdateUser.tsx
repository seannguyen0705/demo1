import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserRole } from '@/utils/enums';
import { UpdateCandidateDto } from '@/api/candidate/interface';
import { UpdateEmployerDto } from '@/api/employer/interface';
import { toast } from 'sonner';
import axiosInstance from '@/config/axios-config';
import { ErrorReponse } from '@/api/interface';
import { AxiosError } from 'axios';

interface IProps {
  role: UserRole;
  showToast?: boolean;
}
export default function useUpdateUser({ role, showToast = true }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCandidateDto | UpdateEmployerDto) => {
      if (role === UserRole.CANDIDATE) {
        return updateCandidate(data);
      }
      return updateEmployer(data);
    },
    onSuccess: () => {
      if (showToast) {
        toast.success('Cập nhật thông tin thành công');
      }
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      if (showToast) {
        toast.error(error.response?.data.message || 'Lỗi cập nhật thông tin');
      }
    },
  });
}

const updateCandidate = async (data: UpdateCandidateDto) => {
  return axiosInstance.put('candidates/me', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updateEmployer = async (data: UpdateEmployerDto) => {
  return axiosInstance.put('employers/me', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
