import { UserStatus } from '@/utils/enums';
import DialogProfile from './DialogProfile';
import ActionStatus from './ActionStatus';

interface IProps {
  employerId: string;
  status: UserStatus;
}
export default function ActionEmployer({ employerId, status }: IProps) {
  return (
    <div className="flex items-center gap-2 justify-end">
      <DialogProfile employerId={employerId} />
      <ActionStatus employerId={employerId} status={status} />
    </div>
  );
}
