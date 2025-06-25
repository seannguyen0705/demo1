import { ErrorReponse } from '@/apiService/interface';

export function isErrorResponse(response: object): response is ErrorReponse {
  if (!response) {
    return false;
  }
  return 'errorCode' in response;
}
