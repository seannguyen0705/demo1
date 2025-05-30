import queryFetch from '@/utils/helpers/queryFetch';
import { ICompany } from './interface';
import { TIME_CACHE } from '@/utils/constants';
export const findCompanyByName = async (name: string) => {
  const response = queryFetch<ICompany>(`companies/${name}`, {
    method: 'GET',
    next: {
      tags: [`company/${name}`],
      revalidate: TIME_CACHE,
    },
  });
  return response;
};
