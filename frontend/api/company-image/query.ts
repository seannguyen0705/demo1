import queryFetch from '@/utils/helpers/queryFetch';
import { ICompanyImage } from './interface';

export const getCompanyImage = async (companyId: string) => {
  const response = await queryFetch<ICompanyImage[]>(`company/${companyId}/images`, {
    method: 'GET',
    next: {
      tags: [`company/${companyId}/images`],
    },
  });
  return response;
};
