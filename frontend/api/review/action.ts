'user server';

import { CreateReview } from './interface';

import queryFetch from '@/utils/helpers/queryFetch';
import { IReview } from './interface';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { revalidateTag } from 'next/cache';

export const createReview = async (data: CreateReview, companyId: string) => {
  const response = await queryFetch<IReview>(`company/reviews`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!isErrorResponse(response)) {
    revalidateTag(`company/${companyId}/reviews/`);
    revalidateTag(`company/${companyId}/reviews/statistics`);
  }
  return response;
};
