import axiosInstance from '@/config/axios-config';
import { IReview } from '@/api/review/interface';
import { useQuery } from '@tanstack/react-query';

const getMyReview = async (companyId: string) => {
  return axiosInstance.get<{ data: IReview }>(`company/${companyId}/reviews/me`);
};

interface IProps {
  companyId: string;
}
export default function useGetMyReview({ companyId }: IProps) {
  return useQuery({
    queryKey: ['my-review', companyId],
    queryFn: () => getMyReview(companyId),
  });
}
