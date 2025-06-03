'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, X } from 'lucide-react';
import useGetMe from '@/app/hooks/useGetMe';
import { JobStatus, UserRole } from '@/utils/enums';
import Link from 'next/link';
import CheckBox from '@/components/Checkbox';
import { useSearchParams } from 'next/navigation';
import useQueryJob from '../hooks/useQueryJob';

export default function StatusFilter() {
  const { user } = useGetMe();
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryJob();
  const status = searchParams.get('status');
  if (user?.role === UserRole.EMPLOYER) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={`flex cursor-pointer items-center gap-2 border dark:hover:border-white hover:border-green rounded-full px-2 py-1 dark:bg-gray-800 bg-light-green ${status && 'border-green text-green dark:text-white dark:border-white'}`}
          >
            {status ? status : 'Trạng thái'}{' '}
            {status ? (
              <Link className="hover:opacity-50" href={`?${createQueryString('status', '')}`}>
                <X />
              </Link>
            ) : (
              <ChevronDown className="size-4" />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <div className="">
            {Object.values(JobStatus).map((item) => (
              <Link
                replace={true}
                key={item}
                href={`?${createQueryString('status', item)}`}
                className="flex items-center gap-2 px-2 py-1 hover:bg-light-green dark:hover:bg-gray-800"
              >
                <CheckBox checked={item === status} />
                <span>{item}</span>
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  return null;
}
