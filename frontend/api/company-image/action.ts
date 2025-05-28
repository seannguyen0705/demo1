'use server';

import actionFetch from '@/utils/helpers/actionFetch';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { revalidateTag } from 'next/cache';

export const createCompanyImage = async (file: Blob, companyId: string) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await actionFetch('employer/company/images', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  if (!isErrorResponse(response)) {
    revalidateTag(`company/${companyId}/images`);
  }
  return response;
};

export const deleteCompanyImage = async (id: string, companyId: string) => {
  const response = await actionFetch(`employer/company/images/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!isErrorResponse(response)) {
    revalidateTag(`company/${companyId}/images`);
  }
  return response;
};
