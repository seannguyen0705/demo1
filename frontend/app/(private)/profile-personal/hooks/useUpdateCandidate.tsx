import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/config/axios-config';
import { UpdateCandidateDto } from '@/api/candidate/interface';
import { AxiosError } from 'axios';
import { ErrorReponse } from '@/api/interface';

const updateCandidate = async (data: UpdateCandidateDto) => {
  return axiosInstance.put('candidates/me', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default function useUpdateCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCandidate,
    onSuccess: () => {
      toast.success('Cập nhật thông tin thành công');
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      toast.error(error.response?.data.message || 'Lỗi cập nhật thông tin');
    },
  });
}
