'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { JobType } from '@/utils/enums';

import CheckBox from '@/components/Checkbox';
import { useSearchParams } from 'next/navigation';
import useQueryJob from '../hooks/useQueryJob';

const jobTypes = [JobType.OFFICE, JobType.HYBRID, JobType.REMOTE, JobType.FREELANCE];

export function JobTypeFilter() {
  const jobType = useSearchParams().get('jobType');
  const { createQueryString, handleClear } = useQueryJob();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`flex cursor-pointer items-center gap-2 border dark:hover:border-white hover:border-green rounded-full px-2 py-1 dark:bg-gray-800 bg-light-green ${jobType && 'border-green text-green dark:text-white dark:border-white'}`}
        >
          {jobType ? jobType : 'Loại việc làm'}{' '}
          {jobType ? (
            <Link replace={true} href={`?${handleClear('jobType')}`}>
              <X />
            </Link>
          ) : (
            <ChevronDown className="size-4" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="">
          {jobTypes.map((jobtype) => (
            <Link
              key={jobtype}
              replace={true}
              href={`?${createQueryString('jobType', jobtype)}`}
              className="flex items-center gap-2 px-2 py-1 hover:bg-light-green dark:hover:bg-gray-800"
            >
              <CheckBox checked={jobType === jobtype} />
              <span>{jobtype}</span>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
