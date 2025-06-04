import CheckBox from '@/components/Checkbox';
import { JobType } from '@/utils/enums';

interface IProps {
  jobType: string;
  onChange: (value: string) => void;
}

export default function JobTypeFilterSmall({ jobType, onChange }: IProps) {
  const handleChange = (value: string) => {
    if (jobType === value) {
      onChange('');
    } else {
      onChange(value);
    }
  };
  return (
    <div className="border-b pb-2 mb-2">
      <h3>Loại công việc</h3>
      <ul className="grid grid-cols-2 gap-2">
        {Object.values(JobType).map((type) => (
          <li onClick={() => handleChange(type)} className="flex items-center cursor-pointer gap-2" key={type}>
            <CheckBox checked={jobType === type} />
            <span>{type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
