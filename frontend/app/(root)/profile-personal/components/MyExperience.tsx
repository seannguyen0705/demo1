'use client';
import { Skeleton } from '@/components/ui/skeleton';
import ExperienceItem from './ExperienceItem';
import useGetExperience from '../hooks/useGetExperience';

function SkeletonExperienceItem() {
  return (
    <li className="dark:bg-gray-900 bg-[#EBF5F4] rounded-[20px]  mb-4">
      <div className="flex justify-between items-start mb-4">
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
      <h6 className="text-xl">Kinh nghiệm làm việc</h6>
      <p className="text-sm text-gray-500">
        Thể hiện những thông tin chi tiết về quá trình làm việc
      </p>
      <ul>
        {data?.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </ul>
    </>
  );
}
