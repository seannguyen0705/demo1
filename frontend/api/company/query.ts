import queryFetch from '@/utils/helpers/queryFetch';
import { ICompany } from './interface';

export const findCompanyByName = async (name: string) => {
  const response = await queryFetch<ICompany>(`companies/${name}`, {
    method: 'GET',
    next: {
      tags: [`company/${decodeURIComponent(name)}`],
    },
  });
  return response.data;
};

export const getTop10Companies = async () => {
  const response = await queryFetch<ICompany[]>('companies/top-10', {
    method: 'GET',
  });
  return response.data;
};
