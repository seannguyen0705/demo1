import customFetch from '@/utils/helpers/customFetch';
import { ICv } from './interface';
export const getMyCv = async () => {
  const response = await customFetch<ICv[]>('cvs', {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['cvs'],
    },
  });
  return response;
};
