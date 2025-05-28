'use client';
import { Skeleton } from '@/components/ui/skeleton';
import ExperienceItem from './ExperienceItem';
import useGetExperience from '../hooks/useGetExperience';
import CreateExperience from './CreateExperience';

function SkeletonExperienceItem() {
  return (
    <li className="mb-4 rounded-[20px] bg-[#EBF5F4]  dark:bg-gray-900">
      <div className="mb-4 flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48 bg-white/50" />
          <Skeleton className="h-4 w-32 bg-white/50" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-white/50" />
        <Skeleton className="h-4 w-3/4 bg-white/50" />
        <Skeleton className="h-4 w-1/2 bg-white/50" />
      </div>
    </li>
  );
}

export default function MyExperience() {
  const { data, isLoading } = useGetExperience();

  if (isLoading) {
    return (
      <ul>
        {Array.from({ length: 2 }).map((_, index) => (
          <SkeletonExperienceItem key={index} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <div className="flex mb-3 items-center justify-between">
        <h6 className="text-xl">Kinh nghiệm làm việc</h6>
        <CreateExperience />
      </div>

      <p className="text-sm text-gray-500">Thể hiện những thông tin chi tiết về quá trình làm việc</p>
      <ul>{data?.map((experience) => <ExperienceItem key={experience.id} experience={experience} />)}</ul>
    </>
  );
}
