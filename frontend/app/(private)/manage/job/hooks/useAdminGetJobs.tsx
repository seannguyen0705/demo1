import { QueryJob } from '@/api/job/interface';
import axiosInstance from '@/config/axios-config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const adminGetJobs = async (queryString: string) => {
  try {
    const response = await axiosInstance.get<{ data: QueryJob }>(`admin/jobs?${queryString}`);
    return response.data.data;
  } catch (error) {
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
