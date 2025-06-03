'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ListFilter } from 'lucide-react';
import Link from 'next/link';
import { SortJob } from '@/utils/enums';
import useQueryParams from '@/app/hooks/useQueryParams';
import { useSearchParams } from 'next/navigation';

export default function OrderBy() {
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryParams();
  const sort = searchParams.get('sort') || 'Mới nhất';
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2">
          {sort}
          <ListFilter />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="">
          {Object.values(SortJob).map((sort) => (
            <Link
              replace={true}
              key={sort}
              href={`?${createQueryString('sort', sort)}`}
              className="flex items-center gap-2 px-2 py-1 hover:bg-light-green dark:hover:bg-gray-800"
            >
              <span>{sort}</span>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
