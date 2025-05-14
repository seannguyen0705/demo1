'use server';

import { redirect } from 'next/navigation';

export async function redirectToGoogleLogin() {
  const url = process.env.BACKEND_URL + '/api/v1/google/login';
  redirect(url);
}

export async function redirectToGithubLogin() {
  const url = process.env.BACKEND_URL + '/api/v1/github/login';
  redirect(url);
}
