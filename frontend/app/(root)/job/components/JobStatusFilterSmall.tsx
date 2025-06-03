import useGetMe from '@/app/hooks/useGetMe';
import CheckBox from '@/components/Checkbox';
import { JobStatus, UserRole } from '@/utils/enums';

interface IProps {
  jobStatus: string;
  onChange: (value: string) => void;
}

export default function JobStatusFilterSmall({ jobStatus, onChange }: IProps) {
  const { user, isLoading } = useGetMe();
  if (!user || isLoading) {
    return;
  }
  if (user.role !== UserRole.EMPLOYER) {
    return;
  }
  const handleChange = (value: string) => {
    if (jobStatus === value) {
      onChange('');
    } else {
      onChange(value);
    }
  };
  return (
    <div className="border-b pb-2 mb-2">
      <h3>Trạng thái</h3>
      <ul className="grid grid-cols-2 gap-2">
        {Object.values(JobStatus).map((status) => (
          <li onClick={() => handleChange(status)} className="flex items-center cursor-pointer gap-2" key={status}>
            <CheckBox checked={jobStatus === status} />
            <span>{status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
