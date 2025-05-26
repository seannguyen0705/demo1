import { cookies } from 'next/headers';

export const getAuthCookie = async () => {
  const cookieStore = await cookies();
  const authentication = cookieStore.get('Authentication');
  const refresh = cookieStore.get('Refresh');
  if (!refresh) {
    return '';
  }
  return `${authentication?.name}=${authentication?.value}; ${refresh?.name}=${refresh?.value}`;
};
