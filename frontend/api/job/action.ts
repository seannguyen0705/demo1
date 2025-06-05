'use server';

import actionFetch from '@/utils/helpers/actionFetch';
import { ICreateDraftJob, ICreatePublishedJob, IJob, IUpdateJob } from './interface';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { revalidateTag } from 'next/cache';

export const createPublishedJob = async (data: ICreatePublishedJob) => {
  const response = await actionFetch<IJob>(`jobs/published`, {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!isErrorResponse(response)) {
    revalidateTag(`company/${data.companyId}/jobs`);
  }
  return response;
};

export const createDraftJob = async (data: ICreateDraftJob) => {
  const response = await actionFetch<IJob>(`jobs/draft`, {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!isErrorResponse(response)) {
    revalidateTag(`company/${data.companyId}/jobs`);
  }
  return response;
};

export const updateJob = async (id: string, data: IUpdateJob) => {
  const response = await actionFetch<IJob>(`jobs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!isErrorResponse(response)) {
    revalidateTag(`jobs/${id}`);
  }
  return response;
};
