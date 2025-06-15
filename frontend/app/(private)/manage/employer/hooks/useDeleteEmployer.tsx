import axiosInstance from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteEmployer = async (id: string, reason: string) => {
  return axiosInstance.delete(`/employers/${id}`, { data: { reason } });
};

interface IProps {
  id: string;
}
export default function useDeleteEmployer({ id }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reason: string) => deleteEmployer(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employers'] });
      toast.success('Xóa tài khoản thành công');
    },
  });
}
