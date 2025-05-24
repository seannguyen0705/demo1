'use server';

import actionFetch from '@/utils/helpers/actionFetch';
import { UpdateCandidateDto } from './interface';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { revalidateTag } from 'next/cache';

export const updateCandidate = async (data: UpdateCandidateDto) => {
  const response = await actionFetch('candidates/me', {
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
