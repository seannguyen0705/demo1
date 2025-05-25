'use server';

import actionFetch from '@/utils/helpers/actionFetch';
import { IUpdateCompany } from './interface';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { revalidateTag } from 'next/cache';

export const updateCompany = async (
  id: string,
  data: IUpdateCompany,
  name: string,
) => {
  const response = await actionFetch(`companies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!isErrorResponse(response)) {
    revalidateTag(`company/${name}`);
  }
  return response;
};
