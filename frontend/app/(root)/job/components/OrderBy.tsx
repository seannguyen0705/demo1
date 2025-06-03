import { IQueryJob } from '@/api/job/interface';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ListFilter } from 'lucide-react';
import Link from 'next/link';
import { SortJob } from '@/utils/enums';
import { createQueryString } from '@/utils/helpers/createQueryString';

interface IProps {
  queryJob: IQueryJob;
}

export default function OrderBy({ queryJob }: IProps) {
  const { sort = 'Mới nhất' } = queryJob;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2">
          {sort}
          <ListFilter />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="">
          {Object.values(SortJob).map((sort) => (
            <Link
              replace={true}
              key={sort}
              href={`?${createQueryString('sort', sort, queryJob as Record<string, string>)}`}
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
