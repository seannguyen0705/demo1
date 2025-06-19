import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';
import { IContact } from '@/api/contact/interface';

const getContactById = async (id: string) => {
  const response = await axiosInstance.get<{ data: IContact }>(`/contacts/${id}`);
  return response.data.data;
};

export default function useGetContactById(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['contact', id],
    queryFn: () => getContactById(id),
  });
  return { data, isLoading };
}
