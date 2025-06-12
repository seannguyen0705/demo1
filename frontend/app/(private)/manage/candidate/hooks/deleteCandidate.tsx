import axiosInstance from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteCandidate = async (id: string) => {
  const response = await axiosInstance.delete(`candidates/${id}`);
  return response.data;
};

export default function useDeleteCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast.success('Xóa tài khoản thành công');
    },
  });
}
