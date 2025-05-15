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
  const formData = new FormData();
  formData.append('file', data.document);
  formData.append('name', data.companyName);
  data.companyAddress.forEach((address) => {
    formData.append('address', address);
  });
  formData.append('website', data.website);
  formData.append('email', data.email);
  formData.append('fullName', data.fullName);
  formData.append('workTitle', data.position);
  formData.append('phoneNumber', data.phone);
  const response = await customFetch('business/register', {
    method: 'POST',
    body: formData,
  });

  return response;
}
