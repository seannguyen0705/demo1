'use server';

import { BusinessFormSchema } from '@/app/(root)/recruitment/components/BusinessForm';
import customFetch from '@/utils/helpers/customFetch';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import { cookies } from 'next/headers';
import { LoginDto, ResponseLoginDto, TokenCookie } from './interface';
import { CreateCandidateDto } from '../candidate/interface';
import redirectUnAuth from '@/utils/helpers/redirectUnAuth';
import { UserRole } from '@/utils/enums';
import { redirect } from 'next/navigation';

export const registerCandidate = async (data: CreateCandidateDto) => {
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
  const { accessTokenCookie, refreshTokenCookie, roleCookie } = response.data;
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
  cookieStore.set('Role', roleCookie.role, {
    httpOnly: true,
    path: '/',
    maxAge: roleCookie.ttl,
  });

  return response;
};

export const refreshToken = async () => {
  const response = await customFetch<{ accessTokenCookie: TokenCookie }>(
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

export const getAuthCookie = async () => {
  const cookieStore = await cookies();
  const Authentication = cookieStore.get('Authentication');
  const Refresh = cookieStore.get('Refresh');
  return `${Authentication?.name}=${Authentication?.value}; ${Refresh?.name}=${Refresh?.value}`;
};
