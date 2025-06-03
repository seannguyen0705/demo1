'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { JobLevel } from '@/utils/enums';
import CheckBox from '@/components/Checkbox';
import useQueryJob from '../hooks/useQueryJob';
import { useSearchParams } from 'next/navigation';
const levels = [JobLevel.INTERN, JobLevel.FRESHER, JobLevel.JUNIOR, JobLevel.SENIOR, JobLevel.MANAGER];

export function LevelFilter() {
  const jobLevel = useSearchParams().get('jobLevel');
  const { createQueryString, handleClear } = useQueryJob();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`flex cursor-pointer items-center gap-2 border dark:hover:border-white hover:border-green rounded-full px-2 py-1 dark:bg-gray-800 bg-light-green ${jobLevel && 'border-green text-green dark:text-white dark:border-white'}`}
        >
          {jobLevel ? jobLevel : 'Cấp bậc'}{' '}
          {jobLevel ? (
            <Link href={`?${handleClear('jobLevel')}`}>
              <X />
            </Link>
          ) : (
            <ChevronDown className="size-4" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="">
          {levels.map((level) => (
            <Link
              replace={true}
              key={level}
              href={`?${createQueryString('jobLevel', level)}`}
              className="flex items-center gap-2 px-2 py-1 hover:bg-light-green dark:hover:bg-gray-800"
            >
              <CheckBox checked={jobLevel === level} />
              <span>{level}</span>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
