import 'server-only';
import { getAuthCookie } from '@/utils/helpers/getAuthCookie';
import EXCEPTION_CODE from '../constants/exception';
import { notFound } from 'next/navigation';
import { ErrorReponse } from '@/api/interface';

export default async function actionFetch<T>(
  input: string,
  init?: RequestInit,
): Promise<{ data: T } | ErrorReponse> {
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
