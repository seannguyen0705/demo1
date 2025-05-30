export default function genQuerySearch(name: string, value: string, urlSearchParams: URLSearchParams) {
  urlSearchParams.set(name, value);
  return urlSearchParams.toString();
}
