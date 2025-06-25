import { IQueryCandidate } from '@/apiService/candidate/interface';
import axiosInstance from '@/config/axios-config';
import { keepPreviousData } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

const getCandidate = async (queryString: string) => {
  try {
    const response = await axiosInstance.get<{ data: IQueryCandidate }>(`/candidates?${queryString}`);
    return response.data.data;
  } catch {
    return {
      candidates: [],
      currentPage: 1,
      nextPage: null,
      total: 0,
    };
  }
};

export default function useGetCandidate(queryString: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['candidates', queryString],
    queryFn: () => getCandidate(queryString),
    placeholderData: keepPreviousData,
  });
  return { data, isLoading };
}
