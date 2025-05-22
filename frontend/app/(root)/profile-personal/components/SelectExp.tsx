import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SkillYear } from '@/utils/enums';
const expList = [
  SkillYear.LESS_THAN_1_YEAR,
  SkillYear.ONE_YEAR,
  SkillYear.TWO_YEAR,
  SkillYear.THREE_YEAR,
  SkillYear.FOUR_YEAR,
  SkillYear.FIVE_YEAR,
  SkillYear.SIX_YEAR,
  SkillYear.SEVEN_YEAR,
  SkillYear.EIGHT_YEAR,
  SkillYear.NINE_YEAR,
  SkillYear.TEN_YEAR,
  SkillYear.MORE_THAN_10_YEAR,
];

interface IProps {
  onChange: (skillYear: SkillYear) => void;
  skillYear: string;
}
export default function SelectExp({ onChange, skillYear }: IProps) {
  return (
    <Select onValueChange={onChange} value={skillYear}>
      <SelectTrigger className="w-full hover:bg-gray-100">
        <SelectValue placeholder="Chọn năm kinh nghiệm" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Năm kinh nghiệm</SelectLabel>
          {expList.map((exp) => (
            <SelectItem key={exp} value={exp} onClick={() => onChange(exp)}>
              {exp}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
