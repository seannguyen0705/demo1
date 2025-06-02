'use client';

import useGetProvince from '@/app/hooks/useGetProvince';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

interface IProps {
  provinceId: string;
  onChange: (provinceId: string) => void;
}

export default function SelectProvince({ provinceId, onChange }: IProps) {
  const { data: provinces, isLoading } = useGetProvince();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {provinceId ? provinces?.find((province) => province.id === provinceId)?.name : 'Chọn tỉnh/thành...'}
          <ChevronsUpDown className="opacity-50" />
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
                  onSelect={() => {
                    onChange(province.id === provinceId ? '' : province.id);
                    setOpen(false);
                  }}
                >
                  {province.name}
                  <Check className={cn('ml-auto', provinceId === province.id ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
