import EditSkill from './EditSkill';
import MySkill from './MySkill';
import useGetCandidateSkill from '../hooks/useGetCandidateSkill';
import { Skeleton } from '@/components/ui/skeleton';

function SkeletonSkillItem() {
  return (
    <div className="flex items-center gap-2 rounded-full bg-[#EBF5F4] px-4 py-2 dark:bg-gray-900">
      <Skeleton className="h-4 w-24 bg-white/50" />
      <Skeleton className="h-4 w-4 rounded-full bg-white/50" />
    </div>
  );
}

export default function Skill() {
  const { data, isLoading } = useGetCandidateSkill();
  if (isLoading) {
    return (
      <ul className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <SkeletonSkillItem />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="relative mb-[30px] rounded-[20px] bg-[#EBF5F4] p-6 dark:bg-gray-900">
      <EditSkill candidateSkills={data || []} />
      <MySkill candidateSkills={data || []} />
    </section>
  );
}
