'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { JobLevel } from '@/utils/enums';
import CheckBox from '@/components/Checkbox';
import useQueryJob from '../hooks/useQueryJob';
import { useSearchParams } from 'next/navigation';
const levelOptions = [
  {
    label: 'Intern',
    value: JobLevel.INTERN,
  },
  {
    label: 'Fresher',
    value: JobLevel.FRESHER,
  },
  {
    label: 'Junior',
    value: JobLevel.JUNIOR,
  },
  {
    label: 'Senior',
    value: JobLevel.SENIOR,
  },
  {
    label: 'Manager',
    value: JobLevel.MANAGER,
  },
];

export function LevelFilter() {
  const jobLevel = useSearchParams().get('jobLevel');
  const { createQueryString, handleClear } = useQueryJob();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`flex cursor-pointer items-center gap-2 border dark:hover:border-white hover:border-green rounded-full px-2 py-1 dark:bg-gray-800 bg-light-green ${jobLevel && 'border-green text-green dark:text-white dark:border-white'}`}
        >
          {jobLevel ? levelOptions.find((level) => level.value === jobLevel)?.label : 'Cấp bậc'}{' '}
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
          {levelOptions.map((level) => (
            <Link
              replace={true}
              key={level.value}
              href={`?${createQueryString('jobLevel', level.value)}`}
              className="flex items-center gap-2 px-2 py-1 hover:bg-light-green dark:hover:bg-gray-800"
            >
              <CheckBox checked={jobLevel === level.value} />
              <span>{level.label}</span>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
