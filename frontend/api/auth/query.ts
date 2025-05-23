import customFetch from '@/utils/helpers/customFetch';
import { IUser } from '../interface';

export const getMe = async () => {
  const response = await customFetch<IUser>('me', {
    method: 'GET',
    credentials: 'include',
  });

  return response;
};
