import { ActiveCandidateDto } from '@/apiService/auth/interface';
import axiosInstance from '@/config/axios-config';
import { useMutation } from '@tanstack/react-query';

const activeCandidate = async ({ accountToken }: ActiveCandidateDto) => {
  const response = await axiosInstance.post('/active-candidate', { accountToken });
  return response.data;
};

export default function useActiveCandidate() {
  return useMutation({
    mutationFn: activeCandidate,
  });
}
