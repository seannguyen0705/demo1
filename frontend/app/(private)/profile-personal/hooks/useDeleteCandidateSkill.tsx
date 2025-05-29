import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/config/axios-config';

const deleteSkill = async (id: string) => {
  const response = await axiosInstance.delete(`/candidate/skills/${id}`);
  return response;
};

export default function useDeleteCandidateSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: (data: object) => {
      if (isErrorResponse(data)) {
        toast.error(data.message);
      } else {
        toast.success('Xóa kỹ năng thành công');
        queryClient.invalidateQueries({ queryKey: ['candidate-skills'] });
      }
    },
  });
}
