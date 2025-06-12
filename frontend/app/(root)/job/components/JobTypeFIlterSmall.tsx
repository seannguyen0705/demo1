import CheckBox from '@/components/Checkbox';
import { JobType } from '@/utils/enums';

interface IProps {
  jobType: string;
  onChange: (value: string) => void;
}

const jobTypeOptions = [
  {
    label: 'Tại văn phòng',
    value: JobType.OFFICE,
  },
  {
    label: 'Linh hoạt',
    value: JobType.HYBRID,
  },
  {
    label: 'Từ xa',
    value: JobType.REMOTE,
  },
  {
    label: 'Freelance',
    value: JobType.FREELANCE,
  },
];

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
        {jobTypeOptions.map((type) => (
          <li
            onClick={() => handleChange(type.value)}
            className="flex items-center cursor-pointer gap-2"
            key={type.value}
          >
            <CheckBox checked={jobType === type.value} />
            <span>{type.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
