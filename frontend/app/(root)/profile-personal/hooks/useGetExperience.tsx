import axiosInstance from '@/config/axios-config';
import { IExperience } from '@/api/experience/interface';
import { useQuery } from '@tanstack/react-query';

const getMyExperiences = async () => {
  const response = await axiosInstance.get<{ data: IExperience[] }>(
    '/api/v1/experiences',
  );
  return response.data;
};

export default function useGetExperience() {
  const { data, isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: getMyExperiences,
  });
  return { data: data?.data, isLoading };
}
