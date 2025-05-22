'use server';

import customFetch from '@/utils/helpers/customFetch';
import { UpdateCandidateDto } from './interface';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { revalidateTag } from 'next/cache';

export const updateCandidate = async (data: UpdateCandidateDto) => {
  const response = await customFetch('candidates/me', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!isErrorResponse(response)) {
    revalidateTag('candidate');
  }

  return response;
};
