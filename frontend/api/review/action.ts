'user server';

import { CreateReview } from './interface';

import queryFetch from '@/utils/helpers/queryFetch';
import { IReview } from './interface';

export const createReview = async (data: CreateReview) => {
  const response = await queryFetch<IReview>(`reviews`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};
