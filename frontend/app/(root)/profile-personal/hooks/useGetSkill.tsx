import { IQueryPagination } from '@/api/interface';
import { useQuery } from '@tanstack/react-query';
import { getSkills } from '@/api/skill/query';

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
