import { IQueryPagination } from '@/api/interface';
import { useQuery } from '@tanstack/react-query';

import { ISkill } from '@/api/skill/interface';
import axiosInstance from '@/config/axios-config';

const getSkills = async ({
  page = 1,
  limit = 10,
  keyword = '',
}: IQueryPagination) => {
  const response = await axiosInstance.get<{ data: ISkill[] }>(
    `/skills?page=${page}&limit=${limit}&keyword=${keyword}`,
  );
  return response.data;
};

export default function useGetSkill({
  page,
  limit,
  keyword,
}: IQueryPagination) {
  const { data, isLoading } = useQuery({
    queryKey: ['skills', page, limit, keyword],
    queryFn: () => getSkills({ page, limit, keyword }),
  });
  return { data, isLoading };
}
