'use server';

import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { ICreateCandidateSkill } from './interface';
import actionFetch from '@/utils/helpers/actionFetch';
import { revalidateTag } from 'next/cache';

export const addSkill = async (data: ICreateCandidateSkill) => {
  const response = await actionFetch(`candidate-skills`, {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!isErrorResponse(response)) {
    revalidateTag('candidate-skills');
  }
  return response;
};

export const deleteSkill = async (id: string) => {
  const response = await actionFetch(`candidate-skills/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!isErrorResponse(response)) {
    revalidateTag('candidate-skills');
  }
  return response;
};
