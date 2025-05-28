'use server';

import actionFetch from '@/utils/helpers/actionFetch';
import { ICv } from './interface';

export const createCv = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await actionFetch<ICv>('candidate/cv', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  return response;
};

export const deleteCv = async (id: string) => {
  const response = await actionFetch(`candidate/cv/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return response;
};

export const updateCv = async (data: { id: string; file: Blob }) => {
  const formData = new FormData();
  formData.append('file', data.file);

  const response = await actionFetch(`candidate/cv/${data.id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include',
  });
  return response;
};
