import { IUser } from '@/api/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const getEmployerById = async (employerId: string) => {
  const response = await axiosInstance.get<{ data: IUser }>(`/employers/${employerId}`);
  return response.data.data;
};

interface IProps {
  employerId: string;
}

export default function useGetEmployerById({ employerId }: IProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['employer', employerId],
    queryFn: () => getEmployerById(employerId),
    enabled: !!employerId,
  });
  return { employer: data, isLoading };
}
