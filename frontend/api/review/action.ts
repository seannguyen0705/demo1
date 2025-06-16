'use server';

import { CreateReview, UpdateReview } from './interface';

import { IReview } from './interface';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { revalidateTag } from 'next/cache';
import actionFetch from '@/utils/helpers/actionFetch';

export const createReview = async (data: CreateReview, companyId: string) => {
  const response = await actionFetch<IReview>(`company/${companyId}/review/me`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!isErrorResponse(response)) {
    revalidateTag(`company/${companyId}/reviews`);
    revalidateTag(`company/${companyId}/reviews/statistics`);
  }
  return response;
};

export const deleteReview = async (reviewId: string, companyId: string) => {
  const response = await actionFetch(`candidate/review/${reviewId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!isErrorResponse(response)) {
    revalidateTag(`company/${companyId}/reviews`);
    revalidateTag(`company/${companyId}/reviews/statistics`);
  }
  return response;
};

export const adminDeleteReview = async (reviewId: string) => {
  const response = await actionFetch<IReview>(`reviews/${reviewId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!isErrorResponse(response)) {
    revalidateTag(`company/${response.data.companyId}/reviews`);
    revalidateTag(`company/${response.data.companyId}/reviews/statistics`);
  }
  return response;
};

export const updateReview = async (data: UpdateReview, reviewId: string, companyId: string) => {
  const response = await actionFetch(`candidate/review/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!isErrorResponse(response)) {
    revalidateTag(`company/${companyId}/reviews`);
    revalidateTag(`company/${companyId}/reviews/statistics`);
  }
  return response;
};
