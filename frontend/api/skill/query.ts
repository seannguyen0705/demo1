import customFetch from '@/utils/helpers/customFetch';
import { IQueryPagination } from '../interface';
import { ISkillResponse } from './interface';

export const getSkills = async ({
  page = 1,
  limit = 10,
  keyword = '',
}: IQueryPagination) => {
  const response = await customFetch<ISkillResponse>(
    `skills?page=${page}&limit=${limit}&keyword=${keyword}`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  return response;
};
