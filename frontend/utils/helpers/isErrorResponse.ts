export function isErrorResponse(response: object): response is ErrorReponse {
  if (!response) {
    return false;
  }
  return 'errorCode' in response;
}
