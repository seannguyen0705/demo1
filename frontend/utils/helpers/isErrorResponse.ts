export function isErrorResponse(
  response: any,
): response is { code: number; message: string; status: number } {
  if (!response) {
    return false;
  }
  return 'code' in response;
}
