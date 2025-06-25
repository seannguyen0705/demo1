import { ICreateCandidateSkill } from '@/apiService/candidate-skill/interface';
import { ErrorReponse } from '@/apiService/interface';
import axiosInstance from '@/config/axios-config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const addSkill = async (data: ICreateCandidateSkill) => {
  const response = await axiosInstance.post('/candidate/skills', data);
  return response;
};

export const useCreateCandidateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['skills'],
      });
      queryClient.invalidateQueries({
        queryKey: ['candidate-skills'],
      });
      toast.success('Tạo kĩ năng thành công');
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      toast.error(error.response?.data.message);
    },
  });
};
