'use server';

import customFetch from '@/utils/helpers/customFetch';
import { IFile } from './interface';

export async function uploadFile({
  file,
  folder,
}: {
  file: Blob;
  folder: string;
}) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await customFetch<IFile>(`file/${folder}`, {
    method: 'POST',
    body: formData,
  });
  return response;
}

export async function deleteFile(id: string) {
  const response = await customFetch(`file/${id}`, {
    method: 'DELETE',
  });

  return response;
}
