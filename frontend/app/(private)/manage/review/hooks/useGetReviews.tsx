import { QueryReview } from '@/api/review/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
const getReviews = async (query: string) => {
  try {
    const response = await axiosInstance.get<{ data: QueryReview }>(`/reviews?${query}`);
    return response.data.data;
  } catch {
    return {
      reviews: [],
      currentPage: 1,
      nextPage: null,
      total: 0,
    };
  }
};

export default function useGetReviews(query: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['reviews', query],
    queryFn: () => getReviews(query),
    placeholderData: keepPreviousData,
  });
  return { data, isLoading };
}
