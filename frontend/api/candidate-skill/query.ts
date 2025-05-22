import customFetch from '@/utils/helpers/customFetch';
import { ICandidateSkill } from '../candidate-skill/interface';

export const getMySkills = async () => {
  const response = await customFetch<ICandidateSkill[]>(
    `candidate-skills/my-skills`,
    {
      method: 'GET',
      credentials: 'include',
      next: {
        tags: ['candidate-skills'],
      },
    },
  );
  return response;
};
