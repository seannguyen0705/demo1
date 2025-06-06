import queryFetch from '@/utils/helpers/queryFetch';
import { ICompany } from './interface';

export const findCompanyByName = async (name: string) => {
  const response = await queryFetch<ICompany>(`companies/${name}`, {
    method: 'GET',
    next: {
      tags: [`company/${name}`],
    },
  });
  return response.data;
};
