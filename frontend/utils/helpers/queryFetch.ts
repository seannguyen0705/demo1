import 'server-only';

import { getAuthCookie } from '@/utils/helpers/getAuthCookie';

import { isErrorResponse } from './isErrorResponse';
import { notFound } from 'next/navigation';

export default async function queryFetch<T>(
  input: string,
  init?: RequestInit,
): Promise<{ data: T }> {
  try {
    if (init?.credentials === 'include') {
      const authCookie = await getAuthCookie();
      init.headers = {
        ...init.headers,
        Cookie: authCookie,
      };
    }
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/${input}`,
      init,
    );
    const data = await response.json();

    if (response.status === 404) {
      notFound();
    } else if (isErrorResponse(data) && init?.method === 'GET') {
      throw new Error('Server Error'); // throw error to naviagate to error page
    }

    return data as { data: T };
  } catch (error: unknown) {
    console.error(error);
    throw new Error('Server Error');
  }
}
