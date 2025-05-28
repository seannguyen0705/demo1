'use server';

import { ICreateCandidateSkill } from './interface';
import actionFetch from '@/utils/helpers/actionFetch';

export const addSkill = async (data: ICreateCandidateSkill) => {
  const response = await actionFetch('candidate/skills', {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const deleteSkill = async (id: string) => {
  const response = await actionFetch(`candidate/skills/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  return response;
};
