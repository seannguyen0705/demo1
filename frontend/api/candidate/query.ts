import customFetch from '../../utils/helpers/customFetch';
import { IUser } from '../interface';

export const getCandidateMe = async () => {
  const response = await customFetch<IUser>('candidates/me', {
    method: 'GET',
    credentials: 'include',
    next: {
      tags: ['candidate'],
    },
  });
  return response;
};
