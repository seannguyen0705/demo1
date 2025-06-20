'server-only';

import { cookies } from 'next/headers';

export const deleteAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.set('Authentication', '', {
    path: '/',
    maxAge: 0,
    secure: true,
    sameSite: 'none',
    domain: process.env.DOMAIN,
  });
  cookieStore.set('Refresh', '', {
    path: '/',
    maxAge: 0,
    secure: true,
    sameSite: 'none',
    domain: process.env.DOMAIN,
  });
};
