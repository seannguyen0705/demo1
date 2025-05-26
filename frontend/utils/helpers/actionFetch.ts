import 'server-only';
import { getAuthCookie } from '@/utils/helpers/getAuthCookie';
import EXCEPTION_CODE from '../constants/exception';
import { notFound } from 'next/navigation';
import { ErrorReponse } from '@/api/interface';
import { refreshToken } from '@/api/auth/action';
// use for post, put, delete
export default async function actionFetch<T>(
  input: string,
  init?: RequestInit,
): Promise<{ data: T } | ErrorReponse> {
  try {
    const authCookie = await getAuthCookie();
    if (init?.credentials === 'include') {
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
    }
    if (response.status === 401 && authCookie) {
      await refreshToken();
      // success refresh token
      return await actionFetch(input, init);
    }
    return data as { data: T };
  } catch (error: unknown) {
    console.error(error);
    return {
      errorCode: EXCEPTION_CODE.INTERNAL_ERROR_CODE,
      status: 500,
      message: 'Internal Server Error',
    };
  }
}
