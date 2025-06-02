import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { JobType } from '@/utils/enums';

const jobTypes = [JobType.OFFICE, JobType.HYBRID, JobType.REMOTE, JobType.FREELANCE];

export function JobTypeFilter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 border hover:border-green rounded-full px-2 py-1 bg-light-green">
          Loại công việc <ChevronDown className="size-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid grid-cols-2 gap-2">
          {jobTypes.map((jobType) => (
            <Link
              key={jobType}
              href={`/job?jobType=${jobType.toLowerCase()}`}
              className="border text-center hover:border-green rounded-full px-2 py-1 bg-light-green"
            >
              {jobType}
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
