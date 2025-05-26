'use server';

import actionFetch from '@/utils/helpers/actionFetch';
import { ICreateExperience, IUpdateExperience } from './interface';

export const createExperience = async (data: ICreateExperience) => {
  const response = await actionFetch('experiences', {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const deleteExperience = async (id: string) => {
  const response = await actionFetch(`experiences/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return response;
};

export const updateExperience = async (data: IUpdateExperience) => {
  const response = await actionFetch(`experiences/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};
