import customFetch from '@/utils/helpers/customFetch';
import { IUser } from '../interface';

export const getAdminMe = async () => {
  const response = await customFetch<IUser>('admins/me', {
    credentials: 'include',
  });
  return response;
};
