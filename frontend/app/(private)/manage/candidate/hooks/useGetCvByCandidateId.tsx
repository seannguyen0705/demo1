import { ICv } from '@/api/cv/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const getCvByCandidateId = async (candidateId: string) => {
  try {
    const response = await axiosInstance.get<{ data: ICv[] }>(`candidate/${candidateId}/cv`);
    return response.data.data;
  } catch {
    return [];
  }
};

export default function useGetCvByCandidateId(candidateId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['cv', candidateId],
    queryFn: () => getCvByCandidateId(candidateId),
    enabled: !!candidateId,
  });
  return { cvs: data, isLoading };
}
