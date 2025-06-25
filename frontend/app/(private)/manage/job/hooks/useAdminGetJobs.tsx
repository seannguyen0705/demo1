import { QueryJob } from '@/apiService/job/interface';
import axiosInstance from '@/config/axios-config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const adminGetJobs = async (queryString: string) => {
  try {
    const response = await axiosInstance.get<{ data: QueryJob }>(`admin/jobs?${queryString}`);
    return response.data.data;
  } catch {
    return {
      jobs: [],
      currentPage: 1,
      nextPage: null,
      total: 0,
    };
  }
};

export default function useAdminGetJobs(queryString: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['admin/jobs', queryString],
    queryFn: () => adminGetJobs(queryString),
    placeholderData: keepPreviousData,
  });
  return { data, isLoading };
}
