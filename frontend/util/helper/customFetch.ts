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
    console.log({ error });
    return {
      code: 500,
      status: 500,
      message: 'Internal Server Error',
    };
  }
}
