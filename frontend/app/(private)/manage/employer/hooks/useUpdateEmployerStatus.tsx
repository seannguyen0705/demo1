import { IUpdateUserStatus } from '@/apiService/interface';
import axiosInstance from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateEmployerStatus = async (id: string, data: IUpdateUserStatus) => {
  return axiosInstance.put(`/employers/${id}/status`, data);
};

interface IProps {
  id: string;
}
export default function useUpdateEmployerStatus({ id }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateUserStatus) => updateEmployerStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employers'] });
    },
  });
}
