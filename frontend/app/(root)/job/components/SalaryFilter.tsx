'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import useQueryJob from '../hooks/useQueryJob';

export function SalaryFilter() {
  const searchParams = useSearchParams();

  let minSalary = searchParams.get('minSalary');
  let maxSalary = searchParams.get('maxSalary');
  const { createQueryString } = useQueryJob();
  const router = useRouter();
  const salaryString = getSalary(minSalary, maxSalary);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const inputMinSalary = formData.get('minSalary');
    const inputMaxSalary = formData.get('maxSalary');
    if (inputMinSalary) {
      minSalary = +inputMinSalary < 0 ? '0' : (inputMinSalary as string);
    } else {
      minSalary = '';
    }
    if (inputMaxSalary) {
      maxSalary = +inputMaxSalary < 0 ? '0' : (inputMaxSalary as string);
    } else {
      maxSalary = '';
    }
    if (minSalary && maxSalary) {
      if (+minSalary > +maxSalary) {
        minSalary = '';
        maxSalary = '';
      }
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('minSalary', minSalary);
    params.set('maxSalary', maxSalary);
    router.replace(`?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('minSalary');
    params.delete('maxSalary');
    router.replace(`?${params.toString()}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`flex cursor-pointer dark:bg-gray-800 items-center gap-2 border dark:hover:border-white hover:border-green rounded-full px-2 py-1 bg-light-green ${salaryString && 'border-green dark:border-white dark:text-white text-green'}`}
        >
          {salaryString || 'Mức lương'}{' '}
          {salaryString ? (
            <div onClick={handleClear}>
              <X />
            </div>
          ) : (
            <ChevronDown className="size-4" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
          <Input
            className="selection:bg-green"
            name="minSalary"
            type="number"
            placeholder="Từ"
            defaultValue={minSalary || ''}
          />
          <Input
            className="selection:bg-green"
            name="maxSalary"
            type="number"
            placeholder="Đến"
            defaultValue={maxSalary || ''}
          />
          <Button className="col-span-2 bg-green hover:bg-green/80" type="submit">
            Áp dụng
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

const getSalary = (minSalary: string | null, maxSalary: string | null) => {
  if (minSalary && maxSalary) {
    return `${minSalary}$ - ${maxSalary}$`;
  } else if (minSalary) {
    return `Từ ${minSalary}$`;
  } else if (maxSalary) {
    return `Đến ${maxSalary}$`;
  }
  return '';
};
