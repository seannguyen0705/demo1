import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';
import { IStaticsticsCountIn6MonthsAgo } from '@/api/staticstics/interface';
const getStaticstic6MonthsAgo = async () => {
  try {
    const response = await axiosInstance.get<{ data: IStaticsticsCountIn6MonthsAgo }>(
      '/staticstics/count-in-6-months-ago',
    );
    return response.data.data;
  } catch {
    return {
      jobs: [],
      employers: [],
      candidates: [],
      applyJobs: [],
    };
  }
};

export default function useGetStaticstic6MonthsAgo() {
  const { data, isLoading } = useQuery({
    queryKey: ['staticstics-6-months-ago'],
    queryFn: getStaticstic6MonthsAgo,
  });
  return { data, isLoading };
}
