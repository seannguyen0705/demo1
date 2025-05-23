'server-only';

import { cookies } from 'next/headers';

export const deleteAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('Authentication');
  cookieStore.delete('Refresh');
};
