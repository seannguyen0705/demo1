import { ICandidateSkill } from '@/api/candidate-skill/interface';
import { Skeleton } from '@/components/ui/skeleton';
import SkillItem from './SkillItem';

function SkeletonSkillItem() {
  return (
    <div className="dark:bg-gray-900 bg-[#EBF5F4] rounded-full px-4 py-2 flex items-center gap-2">
      <Skeleton className="h-4 w-24 bg-white/50" />
      <Skeleton className="h-4 w-4 rounded-full bg-white/50" />
    </div>
  );
}

interface IMySkillProps {
  candidateSkills?: ICandidateSkill[];
  isLoading?: boolean;
}

export default function MySkill({ candidateSkills, isLoading }: IMySkillProps) {
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
    <ul className="flex flex-wrap gap-2">
      {candidateSkills?.map((skill) => (
        <li key={skill.id}>
          <SkillItem candidateSkill={skill} />
        </li>
      ))}
    </ul>
  );
}
