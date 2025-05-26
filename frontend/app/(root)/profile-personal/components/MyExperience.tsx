'use client';
import { Skeleton } from '@/components/ui/skeleton';
import ExperienceItem from './ExperienceItem';
import useGetExperience from '../hooks/useGetExperience';

export default function MyExperience() {
  const { data, isLoading } = useGetExperience();
  if (isLoading)
    return (
      <ul>
        <Skeleton className="w-full h-[100px]" />
        <Skeleton className="w-full h-[100px]" />
        <Skeleton className="w-full h-[100px]" />
      </ul>
    );
  return (
    <ul>
      {data?.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </ul>
  );
}
