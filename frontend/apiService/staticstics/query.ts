import queryFetch from '@/utils/helpers/queryFetch';
import { IStaticsticsCount } from './interface';

export const getStaticsticsCount = async () => {
  const response = queryFetch<IStaticsticsCount>('staticstics/count', {
    method: 'GET',
    next: {
      tags: ['staticstics/count'],
    },
  });
  return response;
};
