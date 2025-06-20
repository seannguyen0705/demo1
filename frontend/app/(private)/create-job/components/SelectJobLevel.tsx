'use client';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { JobLevel } from '@/utils/enums';

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SelectJobLevel({ value, onChange }: IProps) {
  return (
    <Select value={value} onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Chọn loại công việc" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={JobLevel.INTERN}>Intern</SelectItem>
        <SelectItem value={JobLevel.FRESHER}>Fresher</SelectItem>
        <SelectItem value={JobLevel.JUNIOR}>Junior</SelectItem>
        <SelectItem value={JobLevel.SENIOR}>Senior</SelectItem>
        <SelectItem value={JobLevel.MANAGER}>Manager</SelectItem>
      </SelectContent>
    </Select>
  );
}
