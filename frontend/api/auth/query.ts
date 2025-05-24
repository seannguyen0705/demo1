import queryFetch from '@/utils/helpers/queryFetch';
import { IUser } from '../interface';

export const getMe = async () => {
  const response = await queryFetch<IUser>('me', {
    method: 'GET',
    credentials: 'include',
  });

  return response;
};
