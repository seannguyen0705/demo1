import EXCEPTION_CODE from '../constants/exception';
import { getAuthCookie } from '@/api/auth/action';
import { isErrorResponse } from './isErrorResponse';
import { notFound } from 'next/navigation';
export default async function customFetch<T>(
  input: string,
  init?: RequestInit,
) {
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
    if (init?.method === 'GET') {
      throw new Error('Server Error');
    }
    return {
      errorCode: EXCEPTION_CODE.INTERNAL_ERROR_CODE,
      status: 500,
      message: 'Internal Server Error',
    };
  }
}
