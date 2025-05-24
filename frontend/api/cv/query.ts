import queryFetch from '@/utils/helpers/queryFetch';
import { ICv } from './interface';
export const getMyCv = async () => {
  const response = await queryFetch<ICv[]>('cvs', {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['cvs'],
    },
  });
  return response;
};
