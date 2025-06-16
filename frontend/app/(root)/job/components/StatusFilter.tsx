'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, X } from 'lucide-react';
import useGetMe from '@/app/hooks/useGetMe';
import { JobStatus, UserRole } from '@/utils/enums';
import Link from 'next/link';
import CheckBox from '@/components/Checkbox';
import { useSearchParams } from 'next/navigation';
import useQueryJob from '../hooks/useQueryJob';

const statusOptions = [
  {
    label: 'Đã đăng',
    value: JobStatus.PUBLISHED,
  },
  {
    label: 'Đã ẩn',
    value: JobStatus.HIDDEN,
  },
  {
    label: 'Bản nháp',
    value: JobStatus.DRAFT,
  },
];

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
            {status ? statusOptions.find((item) => item.value === status)?.label : 'Trạng thái'}{' '}
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
            {statusOptions.map((item) => (
              <Link
                replace={true}
                key={item.value}
                href={`?${createQueryString('status', item.value)}`}
                className="flex items-center gap-2 px-2 py-1 hover:bg-light-green dark:hover:bg-gray-800"
              >
                <CheckBox checked={item.value === status} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  return null;
}
