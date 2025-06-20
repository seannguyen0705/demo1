import CheckBox from '@/components/Checkbox';
import { JobLevel } from '@/utils/enums';

interface IProps {
  jobLevel: string;
  onChange: (value: string) => void;
}

const jobLevelOptions = [
  {
    label: 'Intern',
    value: JobLevel.INTERN,
  },
  {
    label: 'Fresher',
    value: JobLevel.FRESHER,
  },
  {
    label: 'Junior',
    value: JobLevel.JUNIOR,
  },
  {
    label: 'Senior',
    value: JobLevel.SENIOR,
  },
  {
    label: 'Manager',
    value: JobLevel.MANAGER,
  },
];
export default function LevelFilterSmall({ jobLevel, onChange }: IProps) {
  const handleChange = (value: string) => {
    if (jobLevel === value) {
      onChange('');
    } else {
      onChange(value);
    }
  };
  return (
    <div className="border-b pb-2 mb-2">
      <h3>Cấp bậc</h3>
      <ul className="grid grid-cols-2 gap-2">
        {jobLevelOptions.map((level) => (
          <li
            onClick={() => handleChange(level.value)}
            className="flex items-center cursor-pointer gap-2"
            key={level.value}
          >
            <CheckBox checked={jobLevel === level.value} />
            <span>{level.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
