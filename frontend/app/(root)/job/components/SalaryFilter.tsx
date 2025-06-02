import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
export function SalaryFilter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 border hover:border-green rounded-full px-2 py-1 bg-light-green">
          Cấp bậc <ChevronDown className="size-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <form>
          <Input name="minSalary" type="number" placeholder="Mức lương tối thiểu" />
          <Input name="maxSalary" type="number" placeholder="Mức lương tối đa" />
          <Button type="submit">Tìm kiếm</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
