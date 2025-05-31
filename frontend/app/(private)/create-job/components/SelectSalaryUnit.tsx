import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { SalaryUnit } from '@/utils/enums';

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SelectSalaryUnit({ value, onChange }: IProps) {
  return (
    <Select value={value} onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Chọn đơn vị lương" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={SalaryUnit.VND}>VND</SelectItem>
        <SelectItem value={SalaryUnit.USD}>USD</SelectItem>
      </SelectContent>
    </Select>
  );
}
