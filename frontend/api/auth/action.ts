'use server';

import { BusinessFormSchema } from '@/app/(root)/recruitment/components/BusinessForm';
import customFetch from '@/utils/helpers/customFetch';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { cookies } from 'next/headers';

export const registerCandidate = async (data: createCandidateDto) => {
  const response = await customFetch('candidate/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const registerBusiness = async (data: BusinessFormSchema) => {
  const response = await customFetch('business/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const login = async (data: LoginDto) => {
  const response = await customFetch<ResponseLoginDto>('login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (isErrorResponse(response)) {
    return response;
  }

  const cookieStore = await cookies();
  const { accessTokenCookie, refreshTokenCookie } = response.data;
  cookieStore.set('Authentication', accessTokenCookie.token, {
    httpOnly: true,
    path: '/',
    maxAge: accessTokenCookie.ttl,
  });
  cookieStore.set('Refresh', refreshTokenCookie.token, {
    httpOnly: true,
    path: '/',
    maxAge: refreshTokenCookie.ttl,
  });

  return response;
};
