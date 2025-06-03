import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { JobLevel } from '@/utils/enums';

const levels = [JobLevel.INTERN, JobLevel.FRESHER, JobLevel.JUNIOR, JobLevel.SENIOR, JobLevel.MANAGER];

export function LevelFilter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 border hover:border-green rounded-full px-2 py-1 bg-light-green">
          Cấp bậc <ChevronDown className="size-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="grid grid-cols-2 gap-2">
          {levels.map((level) => (
            <Link
              key={level}
              href={`/job?level=${level.toLowerCase()}`}
              className="border text-center hover:border-green rounded-full px-2 py-1 bg-light-green"
            >
              {level}
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
