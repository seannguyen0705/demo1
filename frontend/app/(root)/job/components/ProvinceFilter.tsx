'use client';

import useGetProvince from '@/app/hooks/useGetProvince';
import { ChevronDown, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckBox from '@/components/Checkbox';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import useQueryJob from '../hooks/useQueryJob';
export default function ProvinceFilter() {
  const provinceName = useSearchParams().get('provinceName');
  const { createQueryString } = useQueryJob();
  const { data: provinces } = useGetProvince();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={` cursor-pointer dark:hover:bg-gray-800 border dark:hover:border-white hover:border-green rounded-full px-2 py-1 dark:bg-gray-800 bg-light-green ${provinceName && 'border-green text-green hover:text-green dark:text-white dark:border-white'}`}
        >
          {provinceName ? provinceName : 'Tỉnh/Thành phố'}
          {provinceName ? (
            <Link replace={true} className="hover:opacity-50" href={`?${createQueryString('provinceName', '')}`}>
              <X />
            </Link>
          ) : (
            <ChevronDown className="opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Tìm kiếm tỉnh/thành..." className="h-9" />
          <CommandList>
            <CommandEmpty>Không tìm thấy tỉnh/thành.</CommandEmpty>
            <CommandGroup>
              {provinces?.map((province) => (
                <CommandItem
                  key={province.id}
                  value={province.name}
                  onSelect={(value) => {
                    router.replace(`?${createQueryString('provinceName', value)}`);
                    setOpen(false);
                  }}
                >
                  <CheckBox checked={province.name === provinceName} />
                  {province.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
