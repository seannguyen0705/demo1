import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/config/axios-config';
import { IUser } from '@/api/interface';

const getMe = async () => {
  const response = await axiosInstance.get<{ data: IUser }>('me');
  return response.data;
};

export default function useGetMe() {
  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
  });
  return { user: data?.data, isLoading };
}
