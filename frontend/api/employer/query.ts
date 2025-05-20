import customFetch from '@/utils/helpers/customFetch';
import { Employer } from './interface';

export const getEmployerMe = async () => {
  const response = await customFetch<Employer>('employers/me', {
    credentials: 'include',
  });
  return response;
};
