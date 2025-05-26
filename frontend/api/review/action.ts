'user server';

import { CreateReview } from './interface';

import queryFetch from '@/utils/helpers/queryFetch';
import { IReview } from './interface';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { revalidateTag } from 'next/cache';

export const createReview = async (data: CreateReview) => {
  const response = await queryFetch<IReview>(`reviews`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!isErrorResponse(response)) {
    revalidateTag(`reviews/${data.companyId}`);
    revalidateTag(`reviews/statistics/${data.companyId}`);
  }
  return response;
};
