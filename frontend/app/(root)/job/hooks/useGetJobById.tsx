import { IJob } from '@/apiService/job/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { notFound } from 'next/navigation';
const getJobById = async (jobId: string) => {
  const response = await axiosInstance.get<{ data: IJob }>(`/jobs/${jobId}`);
  return response.data;
};

export default function useGetJobById(jobId: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getJobById(jobId),
    enabled: !!jobId,
  });

  useEffect(() => {
    if (isError) {
      notFound();
    }
  }, [isError]);

  return { job: data?.data, isLoading };
}
