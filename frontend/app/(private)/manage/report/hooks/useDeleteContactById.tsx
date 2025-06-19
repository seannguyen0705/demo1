import axiosInstance from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const deleteContactById = async (id: string) => {
  const response = await axiosInstance.delete(`/contacts/${id}`);
  return response.data;
};

export default function useDeleteContactById() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContactById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      toast.success('Báo cáo đã được xóa');
    },
  });
}
