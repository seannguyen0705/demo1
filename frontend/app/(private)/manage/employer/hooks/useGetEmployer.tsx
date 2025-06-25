import { QueryEmployer } from '@/apiService/employer/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
const getEmployer = async (queryString: string) => {
  try {
    const response = await axiosInstance.get<{ data: QueryEmployer }>(`/employers?${queryString}`);
    return response.data.data;
  } catch {
    return {
      employers: [],
      currentPage: 1,
      nextPage: null,
      total: 0,
    };
  }
};

export default function useGetEmployer(queryString: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['employers', queryString],
    queryFn: () => getEmployer(queryString),
    placeholderData: keepPreviousData,
  });
  return { data, isLoading };
}
