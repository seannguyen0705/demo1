import customFetch from '../../utils/helpers/customFetch';
import { Candidate } from './interface';

export const getCandidateMe = async () => {
  const response = await customFetch<Candidate>('candidates/me', {
    credentials: 'include',
  });
  return response;
};
