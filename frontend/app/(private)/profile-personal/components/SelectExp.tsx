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

const expOptions = [
  {
    value: SkillYear.LESS_THAN_1_YEAR,
    label: 'Dưới 1 năm',
  },
  {
    value: SkillYear.ONE_YEAR,
    label: '1 năm',
  },
  {
    value: SkillYear.TWO_YEAR,
    label: '2 năm',
  },
  {
    value: SkillYear.THREE_YEAR,
    label: '3 năm',
  },
  {
    value: SkillYear.FOUR_YEAR,
    label: '4 năm',
  },
  {
    value: SkillYear.FIVE_YEAR,
    label: '5 năm',
  },
  {
    value: SkillYear.SIX_YEAR,
    label: '6 năm',
  },
  {
    value: SkillYear.SEVEN_YEAR,
    label: '7 năm',
  },
  {
    value: SkillYear.EIGHT_YEAR,
    label: '8 năm',
  },
  {
    value: SkillYear.NINE_YEAR,
    label: '9 năm',
  },
  {
    value: SkillYear.TEN_YEAR,
    label: '10 năm',
  },
  {
    value: SkillYear.MORE_THAN_10_YEAR,
    label: 'Trên 10 năm',
  },
];
interface IProps {
  onChange: (skillYear: SkillYear) => void;
  skillYear: string;
}
export default function SelectExp({ onChange, skillYear }: IProps) {
  return (
    <Select onValueChange={onChange} value={skillYear}>
      <SelectTrigger className="w-full ">
        <SelectValue placeholder="Chọn năm kinh nghiệm" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Năm kinh nghiệm</SelectLabel>
          {expOptions.map((exp) => (
            <SelectItem
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
              key={exp.value}
              value={exp.value}
              onClick={() => onChange(exp.value)}
            >
              {exp.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
