export function isErrorResponse(response: any): response is ErrorReponse {
  if (!response) {
    return false;
  }
  return 'errorCode' in response;
}
