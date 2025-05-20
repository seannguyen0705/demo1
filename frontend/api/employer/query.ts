import customFetch from '@/utils/helpers/customFetch';
import { IUser } from '../interface';

export const getEmployerMe = async () => {
  const response = await customFetch<IUser>('employers/me', {
    credentials: 'include',
  });
  return response;
};
