import axiosInstance from '@/config/axios-config';
import { IUpdateUserStatus } from '@/apiService/interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateCandidateStatus = async (id: string, data: IUpdateUserStatus) => {
  return axiosInstance.put(`/candidates/${id}/status`, data);
};

interface IProps {
  id: string;
}

export default function useUpdateCandidateStatus({ id }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateUserStatus) => updateCandidateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    },
  });
}
