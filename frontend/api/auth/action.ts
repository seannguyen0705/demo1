'use server';

import { BusinessFormSchema } from '@/app/(root)/recruitment/components/BusinessForm';
import actionFetch from '@/utils/helpers/actionFetch';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { cookies } from 'next/headers';
import { LoginDto, ResponseLoginDto, TokenCookie } from './interface';
import { CreateCandidateDto } from '../candidate/interface';
import redirectUnAuth from '@/utils/helpers/redirectUnAuth';
import { UserRole } from '@/utils/enums';
import { redirect } from 'next/navigation';

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
  });
  cookieStore.set('Refresh', refreshTokenCookie.token, {
    httpOnly: true,
    path: '/',
    maxAge: refreshTokenCookie.ttl,
  });

  return response;
};

export const refreshToken = async () => {
  const response = await actionFetch<{ accessTokenCookie: TokenCookie }>(
    'refresh-token',
    {
      method: 'POST',
      credentials: 'include',
    },
  );
  return response;
};

export const checkCookie = async () => {
  const cookieStore = await cookies();
  const Refresh = cookieStore.get('Refresh');
  const Authentication = cookieStore.get('Authentication');
  const Role = cookieStore.get('Role');
  const urlRedirect = redirectUnAuth(Role?.value as UserRole);

  if (!Refresh && !Authentication) {
    redirect(urlRedirect);
  } else if (Refresh && !Authentication) {
    await refreshToken();
  }
};

export const logout = async () => {
  const cookieStore = await cookies();
  await actionFetch('logout', {
    method: 'POST',
    credentials: 'include',
  });
  cookieStore.delete('Authentication');
  cookieStore.delete('Refresh');
  redirect('/sign-in');
};
