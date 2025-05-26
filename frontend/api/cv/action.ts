'use server';

import actionFetch from '@/utils/helpers/actionFetch';
import { ICv } from './interface';

export const createCv = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await actionFetch<ICv>('cvs', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  return response;
};

export const deleteCv = async (id: string) => {
  const response = await actionFetch(`cvs/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return response;
};

export const updateCv = async (data: { id: string; file: Blob }) => {
  const formData = new FormData();
  formData.append('file', data.file);

  const response = await actionFetch(`cvs/${data.id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  });
  return response;
};
