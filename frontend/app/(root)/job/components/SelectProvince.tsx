import useGetProvince from '@/app/hooks/useGetProvince';
import { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import CheckBox from '@/components/Checkbox';

interface IProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function SelectProvince({ value, onChange }: IProps) {
  const { data: provinces } = useGetProvince();
  const [open, setOpen] = useState(false);

  // Hàm xử lý chọn/bỏ chọn tỉnh
  const handleSelect = (provinceName: string) => {
    if (value.includes(provinceName)) {
      onChange(value.filter((name) => name !== provinceName));
    } else if (value.length < 3) {
      onChange([...value, provinceName]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value.length > 0 ? (
            <span className="truncate w-4/5 text-left">{value.join(', ')}</span>
          ) : (
            'Chọn tối đa 3 tỉnh/thành...'
          )}
          <ChevronsUpDown className="opacity-50 ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Tìm kiếm tỉnh/thành..." className="h-9" />
          <CommandList>
            <CommandEmpty>Không tìm thấy tỉnh/thành.</CommandEmpty>
            <CommandGroup>
              {provinces?.map((province) => {
                const isSelected = value.includes(province.name);
                const isDisabled = !isSelected && value.length >= 3;
                return (
                  <CommandItem
                    key={province.id}
                    value={province.name}
                    onSelect={() => handleSelect(province.name)}
                    disabled={isDisabled}
                    className={cn('flex items-center cursor-pointer', isDisabled && 'opacity-50 pointer-events-none')}
                  >
                    <span className="flex-1">{province.name}</span>
                    <span
                      className={cn(
                        'ml-2 flex h-4 w-4 items-center justify-center rounded border border-muted',
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-background',
                      )}
                    >
                      {isSelected && <CheckBox checked={isSelected} />}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
