'use server';
// dùng server action để revalidate tag

import actionFetch from '@/utils/helpers/actionFetch';
import { IUpdateCompany } from './interface';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { revalidateTag } from 'next/cache';

export const updateCompany = async (data: IUpdateCompany, name: string) => {
  const response = await actionFetch('employer/company', {
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

export const uploadLogo = async (file: Blob, name: string) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await actionFetch('employer/company/logo', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  const check = !isErrorResponse(response);

  if (check) {
    revalidateTag(`company/${name}`);
    revalidateTag(`company/${name}/jobs`);
  }
  return response;
};

export const uploadBackground = async (file: Blob, name: string) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await actionFetch('employer/company/background', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  if (!isErrorResponse(response)) {
    revalidateTag(`company/${name}`);
  }
  return response;
};
