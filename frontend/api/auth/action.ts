'use server';

import { BusinessFormSchema } from '@/app/(root)/recruitment/components/BusinessForm';
import actionFetch from '@/utils/helpers/actionFetch';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { cookies } from 'next/headers';
import { LoginDto, ResponseLoginDto, TokenCookie } from './interface';
import { CreateCandidateDto } from '../candidate/interface';
import { redirect } from 'next/navigation';

import { deleteAuthCookie } from '@/utils/helpers/deleteAuthCookie';

export const registerCandidate = async (data: CreateCandidateDto) => {
  const response = await actionFetch('candidate/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const registerBusiness = async (data: BusinessFormSchema) => {
  const response = await actionFetch('business/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};

export const login = async (data: LoginDto) => {
  const response = await actionFetch<ResponseLoginDto>('login', {
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
    secure: true,
    sameSite: 'none',
  });
  cookieStore.set('Refresh', refreshTokenCookie.token, {
    httpOnly: true,
    path: '/',
    maxAge: refreshTokenCookie.ttl,
    secure: true,
    sameSite: 'none',
  });
  return response;
};

export const refreshToken = async () => {
  const cookieStore = await cookies();
  const refresh = cookieStore.get('Refresh');
  if (!refresh) {
    await deleteAuthCookie();
    redirect('/sign-in');
  }
  const refreshCookie = `${refresh?.name}=${refresh?.value}`;
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/refresh-token`, {
    method: 'POST',
    headers: {
      Cookie: refreshCookie,
    },
  });
  if (response.ok) {
    const data: { data: { accessTokenCookie: TokenCookie } } = await response.json();
    const { accessTokenCookie } = data.data;
    cookieStore.set('Authentication', accessTokenCookie.token, {
      httpOnly: true,
      path: '/',
      maxAge: accessTokenCookie.ttl,
      secure: true,
      sameSite: 'none',
      domain: process.env.DOMAIN,
    });
  } else {
    await deleteAuthCookie();
    redirect('/sign-in');
  }
};

export const logout = async () => {
  await actionFetch('logout', {
    method: 'POST',
    credentials: 'include',
  });
  await deleteAuthCookie();
  redirect('/sign-in');
};

export const deleteMe = async () => {
  const response = await actionFetch('me', {
    method: 'DELETE',
    credentials: 'include',
  });
  if (isErrorResponse(response)) {
    return response;
  }
  await deleteAuthCookie();
  return response;
};
