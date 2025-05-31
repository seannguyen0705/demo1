import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SalaryType } from '@/utils/enums';

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RadioSalaryType({ value, onChange }: IProps) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="flex items-center gap-3">
        <RadioGroupItem value={SalaryType.NEGOTIATION} id="r1" />
        <Label htmlFor="r1">Thương lượng</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value={SalaryType.UPTO} id="r2" />
        <Label htmlFor="r2">Lên đến</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value={SalaryType.ATLEAST} id="r3" />
        <Label htmlFor="r3">Tối thiểu</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value={SalaryType.RANGE} id="r4" />
        <Label htmlFor="r4">Khoảng</Label>
      </div>
    </RadioGroup>
  );
}
