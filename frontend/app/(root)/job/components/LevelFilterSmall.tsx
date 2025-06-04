import CheckBox from '@/components/Checkbox';
import { JobLevel } from '@/utils/enums';

interface IProps {
  jobLevel: string;
  onChange: (value: string) => void;
}

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
        {Object.values(JobLevel).map((level) => (
          <li onClick={() => handleChange(level)} className="flex items-center cursor-pointer gap-2" key={level}>
            <CheckBox checked={jobLevel === level} />
            <span>{level}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
