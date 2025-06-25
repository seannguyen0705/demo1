import { ICompanyAddress } from '@/apiService/company-address/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const getCompanyAddresses = async () => {
  const response = await axiosInstance.get<{ data: ICompanyAddress[] }>('/company/addresses');
  return response.data;
};

export default function useGetCompanyAddresses() {
  const { data, isLoading } = useQuery({
    queryKey: ['company-addresses'],
    queryFn: getCompanyAddresses,
  });
  return { data, isLoading };
}
