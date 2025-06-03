import { IQueryJob, QueryJob } from '@/api/job/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const getEmployerJobs = async (queryJob: IQueryJob) => {
  const response = await axiosInstance.get<{ data: QueryJob }>('/employer/jobs', {
    params: queryJob,
    paramsSerializer: {
      indexes: null,
    },
  });
  return response.data;
};

export default function useEmployerGetJobs(queryJob: IQueryJob) {
  const { data, isLoading } = useQuery({
    queryKey: ['jobs', queryJob],
    queryFn: () => getEmployerJobs(queryJob),
  });
  return { data, isLoading };
}
