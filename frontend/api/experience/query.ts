import customFetch from '@/utils/helpers/customFetch';
import { IExperience } from './interface';

export const getMyExperiences = async () => {
  const response = await customFetch<IExperience[]>('experiences', {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['experiences'],
    },
  });
  return response;
};
