import { IQueryPagination } from '../interface';

export const getSkills = async ({
  page = 1,
  limit = 10,
  keyword = '',
}: IQueryPagination) => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/skills?page=${page}&limit=${limit}&keyword=${keyword}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  return response.json();
};
