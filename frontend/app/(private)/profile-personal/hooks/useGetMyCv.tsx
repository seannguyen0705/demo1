import { ICv } from '@/apiService/cv/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const getMyCv = async () => {
  const response = await axiosInstance.get<{ data: ICv[] }>('/candidate/cv');
  return response.data;
};

export default function useGetMyCv() {
  const { data, isLoading } = useQuery({
    queryKey: ['my-cv'],
    queryFn: getMyCv,
  });

  return {
    myCvs: data?.data,
    isLoading,
  };
}
