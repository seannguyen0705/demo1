import { useQuery } from '@tanstack/react-query';

import { IQuerySkill, ISkillResponse } from '@/api/skill/interface';
import axiosInstance from '@/config/axios-config';

const getSkills = async ({ page = 1, limit = 10, keyword = '', excludeSkillIds = [] }: IQuerySkill) => {
  const response = await axiosInstance.get<{ data: ISkillResponse }>('/skills', {
    params: {
      page,
      limit,
      keyword,
      excludeSkillIds,
    },
    paramsSerializer: {
      indexes: null,
    },
  });
  return response.data;
};

export default function useGetSkill({ page, limit, keyword, excludeSkillIds }: IQuerySkill) {
  const { data, isLoading } = useQuery({
    queryKey: ['skills', page, limit, keyword, excludeSkillIds],
    queryFn: () => getSkills({ page, limit, keyword, excludeSkillIds }),
  });
  return { data, isLoading };
}
