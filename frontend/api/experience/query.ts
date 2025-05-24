import queryFetch from '@/utils/helpers/queryFetch';
import { IExperience } from './interface';

export const getMyExperiences = async () => {
  const response = await queryFetch<IExperience[]>('experiences', {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['experiences'],
    },
  });
  return response;
};
