import { UserStatus } from '@/utils/enums';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { CiLock, CiUnlock } from 'react-icons/ci';
import useUpdateEmployerStatus from '../hooks/useUpdateEmployerStatus';
import ConfirmAction from '@/app/(private)/manage-candidates/components/ConfirmAction';
interface IProps {
  employerId: string;
  status: UserStatus;
}

export default function ActionStatus({ employerId, status }: IProps) {
  const { mutate: updateEmployerStatus, isPending } = useUpdateEmployerStatus({ id: employerId });
  if (status === UserStatus.ACTIVE) {
    return (
      <ConfirmAction
        title="Xác nhận khóa tài khoản"
        disabled={isPending}
        description="Bạn có chắc chắn muốn khóa tài khoản này không?"
        action={() => updateEmployerStatus({ status: UserStatus.BANNED })}
        button={
          <button className="text-red-500 p-2 rounded-md border shadow-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <CiLock className="h-3 w-3" />
          </button>
        }
      />
    );
  }
  if (status === UserStatus.INACTIVE) {
    return (
      <ConfirmAction
        title="Xác nhận kích hoạt tài khoản"
        disabled={isPending}
        description="Bạn có chắc chắn muốn kích hoạt tài khoản này không?"
        action={() => updateEmployerStatus({ status: UserStatus.ACTIVE })}
        button={
          <button className="text-green-500 p-2 rounded-md border shadow-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <Check className="h-3 w-3" />
          </button>
        }
      />
    );
  }
  if (status === UserStatus.BANNED) {
    return (
      <ConfirmAction
        title="Xác nhận mở khóa tài khoản"
        disabled={isPending}
        description="Bạn có chắc chắn muốn mở khóa tài khoản này không?"
        action={() => updateEmployerStatus({ status: UserStatus.ACTIVE })}
        button={
          <button className="text-green-500 p-2 rounded-md border shadow-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <CiUnlock className="h-3 w-3" />
          </button>
        }
      />
    );
  }
}
