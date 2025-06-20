import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function useQueryParams() {
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (params.get(name) === value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams],
  );

  const handleClear = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);
    return params.toString();
  };

  return { createQueryString, handleClear };
}
