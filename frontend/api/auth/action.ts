'use server';

import customFetch from '../../util/helper/customFetch';

export async function registerCandidate(data: createCandidateDto) {
  const response = await customFetch('candidate/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log({ response });

  return response;
}
