import DialogProfile from './DialogProfile';
import ActionStatus from './ActionStatus';
import ConfirmDeleteEmployer from './ConfirmDeleteEmployer';
import { IUser } from '@/apiService/interface';
interface IProps {
  employer: IUser;
}
export default function ActionEmployer({ employer }: IProps) {
  return (
    <div className="flex items-center gap-2 justify-end">
      <DialogProfile employerId={employer.id} />
      <ActionStatus employer={employer} />
      <ConfirmDeleteEmployer employer={employer} />
    </div>
  );
}
