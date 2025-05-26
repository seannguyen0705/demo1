'use server';

import actionFetch from '@/utils/helpers/actionFetch';
import { UpdateCandidateDto } from './interface';

export const updateCandidate = async (data: UpdateCandidateDto) => {
  const response = await actionFetch('candidates/me', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return response;
};
