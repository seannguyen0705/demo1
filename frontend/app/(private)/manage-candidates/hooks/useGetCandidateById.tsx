import { IUser } from '@/apiService/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const getCandidateById = async (candidateId: string) => {
  try {
    const response = await axiosInstance.get<{ data: IUser }>(`/candidates/${candidateId}`);
    return response.data.data;
  } catch {
    return undefined;
  }
};

interface IProps {
  candidateId: string;
}

export default function useGetCandidateById({ candidateId }: IProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['candidate', candidateId],
    queryFn: () => getCandidateById(candidateId),
    enabled: !!candidateId,
  });
  return { candidate: data, isLoading };
}
