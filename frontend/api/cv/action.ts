'use server';

import customFetch from '@/utils/helpers/customFetch';
import { ICv } from './interface';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { revalidateTag } from 'next/cache';

export const createCv = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await customFetch<ICv>('cvs', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  if (!isErrorResponse(response)) {
    revalidateTag('cvs');
  }
  return response;
};

export const deleteCv = async (id: string) => {
  const response = await customFetch(`cvs/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!isErrorResponse(response)) {
    revalidateTag('cvs');
  }
  return response;
};

export const updateCv = async (data: { id: string; file: Blob }) => {
  const formData = new FormData();
  formData.append('file', data.file);

  const response = await customFetch(`cvs/${data.id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  });
  if (!isErrorResponse(response)) {
    revalidateTag('cvs');
  }
  return response;
};
