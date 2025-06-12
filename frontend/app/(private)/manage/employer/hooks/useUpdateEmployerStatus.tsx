import { IUpdateEmployerStatus } from '@/api/employer/interface';
import axiosInstance from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateEmployerStatus = async (id: string, data: IUpdateEmployerStatus) => {
  return axiosInstance.put(`/employers/${id}/status`, data);
};

interface IProps {
  id: string;
}
export default function useUpdateEmployerStatus({ id }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateEmployerStatus) => updateEmployerStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employers'] });
    },
  });
}
