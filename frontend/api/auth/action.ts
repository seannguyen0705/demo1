'use server';

import { BusinessFormSchema } from '@/app/(root)/recruitment/components/BusinessForm';
import customFetch from '@/utils/helpers/customFetch';

export async function registerCandidate(data: createCandidateDto) {
  const response = await customFetch('candidate/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}

export async function registerBusiness(data: BusinessFormSchema) {
  const response = await customFetch('business/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
}
