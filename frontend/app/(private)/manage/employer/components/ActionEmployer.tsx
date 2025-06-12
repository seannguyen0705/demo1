import { UserStatus } from '@/utils/enums';
import DialogProfile from './DialogProfile';
import ActionStatus from './ActionStatus';
import ConfirmAction from '@/app/(private)/manage-candidates/components/ConfirmAction';
import useDeleteEmployer from '../hooks/useDeleteEmployer';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
interface IProps {
  employerId: string;
  status: UserStatus;
}
export default function ActionEmployer({ employerId, status }: IProps) {
  const { mutate: deleteEmployer, isPending } = useDeleteEmployer();
  return (
    <div className="flex items-center gap-2 justify-end">
      <DialogProfile employerId={employerId} />
      <ActionStatus employerId={employerId} status={status} />
      <ConfirmAction
        title="Xóa tài khoản"
        description="Bạn có chắc chắn muốn xóa tài khoản này không?"
        action={() => deleteEmployer(employerId)}
        button={
          <Button variant="outline" className="text-red-500 shadow-md" disabled={isPending}>
            <Trash2 className="w-4 h-4" />
          </Button>
        }
        disabled={isPending}
      />
    </div>
  );
}
