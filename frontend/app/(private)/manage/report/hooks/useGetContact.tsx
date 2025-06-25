import { QueryContact } from '@/apiService/contact/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';

const getContact = async (query: string) => {
  try {
    const response = await axiosInstance.get<{ data: QueryContact }>(`/contacts?${query}`);
    return response.data.data;
  } catch {
    return {
      contacts: [],
      currentPage: 1,
      nextPage: null,
      total: 0,
    };
  }
};

export default function useGetContact(query: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['contacts', query],
    queryFn: () => getContact(query),
    placeholderData: keepPreviousData,
  });
  return { data, isLoading };
}
