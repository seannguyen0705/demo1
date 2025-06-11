import axiosInstance from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteEmployer = async (id: string) => {
  return axiosInstance.delete(`/employers/${id}`);
};

export default function useDeleteEmployer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employers'] });
      toast.success('Xóa tài khoản thành công');
    },
  });
}
