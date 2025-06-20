import 'server-only';
import { TIME_CACHE } from '../constants';
// use for get public data (unauth) on server side
export default async function queryFetch<T>(input: string, init?: RequestInit): Promise<{ data: T }> {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/${input}`, {
    ...init,
    next: { ...init?.next, revalidate: TIME_CACHE },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Server Error');
  }
  return data as { data: T };
}
