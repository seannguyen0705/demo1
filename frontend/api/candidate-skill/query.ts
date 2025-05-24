import { ICandidateSkill } from '../candidate-skill/interface';
import queryFetch from '@/utils/helpers/queryFetch';

export const getMySkills = async () => {
  const response = await queryFetch<ICandidateSkill[]>(
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
