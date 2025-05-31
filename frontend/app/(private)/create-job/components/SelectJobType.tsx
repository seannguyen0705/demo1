import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { JobType } from '@/utils/enums';

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SelectJobType({ value, onChange }: IProps) {
  return (
    <Select value={value} onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Chọn loại công việc" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={JobType.OFFICE}>Tại văn phòng</SelectItem>
        <SelectItem value={JobType.HYBRID}>Linh hoạt</SelectItem>
        <SelectItem value={JobType.REMOTE}>Từ xa</SelectItem>
        <SelectItem value={JobType.FREELANCE}>Freelance</SelectItem>
      </SelectContent>
    </Select>
  );
}
