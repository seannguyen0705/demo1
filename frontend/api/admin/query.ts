import customFetch from '@/utils/helpers/customFetch';
import { Admin } from './interface';

export const getAdminMe = async () => {
  const response = await customFetch<Admin>('admins/me', {
    credentials: 'include',
  });
  return response;
};
