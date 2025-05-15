import EXCEPTION_CODE from '../constants/exception';

export default async function customFetch<T>(
  input: string,
  init?: RequestInit,
) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/${input}`,
      init,
    );
    const data = await response.json();

    return data as T;
  } catch (error: unknown) {
    console.error({ error });
    return {
      errorCode: EXCEPTION_CODE.INTERNAL_ERROR_CODE,
      status: 500,
      message: 'Internal Server Error',
    };
  }
}
