import { useQuery } from '@tanstack/react-query';

import axiosInstance from '@/config/axios-config';
import { QueryJob } from '@/apiService/job/interface';

const candidateGetJobApply = async (queryString: string) => {
  const response = await axiosInstance.get<{ data: QueryJob }>(`candidate/job/applications?${queryString}`);
  return response.data;
};

interface IProps {
  queryString: string;
}
export default function useCandidateGetJobApply({ queryString }: IProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['candidateGetJobApply', queryString],
    queryFn: () => candidateGetJobApply(queryString),
  });
  return { data: data?.data, isLoading };
}
