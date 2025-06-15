import axiosInstance from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteCandidate = async (id: string, reason: string) => {
  const response = await axiosInstance.delete(`candidates/${id}`, { data: { reason } });
  return response.data;
};

interface IProps {
  id: string;
}
export default function useDeleteCandidate({ id }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reason: string) => deleteCandidate(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast.success('Xóa tài khoản thành công');
    },
  });
}
