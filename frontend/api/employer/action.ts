import actionFetch from '@/utils/helpers/actionFetch';
import { UpdateEmployerDto } from './interface';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { revalidateTag } from 'next/cache';

export const updateEmployer = async (data: UpdateEmployerDto) => {
  const response = await actionFetch('employers/me', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!isErrorResponse(response)) {
    revalidateTag('me');
  }

  return response;
};
