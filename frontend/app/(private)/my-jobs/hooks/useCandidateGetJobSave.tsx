import { QueryJob } from '@/apiService/job/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const candidateGetJobSaved = async (queryString: string) => {
  const response = await axiosInstance.get<{ data: QueryJob }>(`candidate/job/saved?${queryString}`);
  return response.data;
};

interface IProps {
  queryString: string;
}
export default function useCandidateGetJobSaved({ queryString }: IProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['candidateGetJobSaved', queryString],
    queryFn: () => candidateGetJobSaved(queryString),
  });
  return { data: data?.data, isLoading };
}
