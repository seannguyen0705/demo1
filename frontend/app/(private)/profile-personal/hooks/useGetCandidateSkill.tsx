import { ICandidateSkill } from '@/api/candidate-skill/interface';
import axiosInstance from '@/config/axios-config';
import { useQuery } from '@tanstack/react-query';

const getMySkills = async () => {
  const response = await axiosInstance.get<{ data: ICandidateSkill[] }>(`/candidate/skills`);
  return response.data;
};

export default function useGetCandidateSkill() {
  const { data, isLoading } = useQuery({
    queryKey: ['candidate-skills'],
    queryFn: getMySkills,
  });
  return { data: data?.data, isLoading };
}
