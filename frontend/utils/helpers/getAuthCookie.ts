import { cookies } from 'next/headers';

export const getAuthCookie = async () => {
  const cookieStore = await cookies();
  const Authentication = cookieStore.get('Authentication');
  const Refresh = cookieStore.get('Refresh');
  return `${Authentication?.name}=${Authentication?.value}; ${Refresh?.name}=${Refresh?.value}`;
};
