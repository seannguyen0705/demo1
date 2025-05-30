import { useQuery } from '@tanstack/react-query';

import { IQuerySkill, ISkill } from '@/api/skill/interface';
import axiosInstance from '@/config/axios-config';

const getSkills = async ({ page = 1, limit = 10, keyword = '' }: IQuerySkill) => {
  const response = await axiosInstance.get<{ data: ISkill[] }>(
    `/skills?page=${page}&limit=${limit}&keyword=${keyword}`,
  );
  return response.data;
};

export default function useGetSkill({ page, limit, keyword }: IQuerySkill) {
  const { data, isLoading } = useQuery({
    queryKey: ['skills', page, limit, keyword],
    queryFn: () => getSkills({ page, limit, keyword }),
  });
  return { data, isLoading };
}
