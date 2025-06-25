import { IUpdateApplyJobStatus } from '@/apiService/apply-job/interface';
import axiosInstance from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const updateApplyJobStatus = async (id: string, data: IUpdateApplyJobStatus) => {
  return axiosInstance.put(`/apply-jobs/${id}/status`, data);
};

interface IProps {
  id: string;
  revalidate: boolean;
}
export default function useUpdateApplyJobStatus({ id, revalidate }: IProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IUpdateApplyJobStatus) => updateApplyJobStatus(id, data),
    onSuccess: () => {
      if (revalidate) {
        queryClient.invalidateQueries({ queryKey: ['manage-candidates'] });
        queryClient.invalidateQueries({ queryKey: ['apply-job', id] });
        queryClient.invalidateQueries({ queryKey: ['apply-job-statistics', id] });
      }
    },
  });
}
