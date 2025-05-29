import 'server-only';
import { notFound } from 'next/navigation';
// use for get public data (unauth) on server side
export default async function queryFetch<T>(input: string, init?: RequestInit): Promise<{ data: T }> {
  // try {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/${input}`, init);
  const data = await response.json();

  if (response.status === 404) {
    notFound();
  } else if (!response.ok) {
    throw new Error('Server Error');
  }
  return data as { data: T };
  // } catch (error: unknown) {
  //   console.error(error);
  //   throw new Error('Server Error');
  // }
}
