import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';
import { IProvince } from '@/api/province/interface';

const getProvince = async () => {
  const response = await axiosInstance.get<{ data: IProvince[] }>('/provinces');
  return response.data;
};

export default function useGetProvince() {
  const { data, isLoading } = useQuery({
    queryKey: ['provinces'],
    queryFn: getProvince,
  });
  return { data: data?.data, isLoading };
}
