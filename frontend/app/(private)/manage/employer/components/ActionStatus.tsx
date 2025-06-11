import { UserStatus } from '@/utils/enums';
import { Button } from '@/components/ui/button';
import { Check, Lock } from 'lucide-react';
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
        description="Bạn có chắc chắn muốn khóa tài khoản này không?"
        action={() => updateEmployerStatus({ status: UserStatus.BANNED })}
        button={
          <Button variant="destructive">
            <CiLock />
          </Button>
        }
      />
    );
  }
  if (status === UserStatus.INACTIVE) {
    return (
      <ConfirmAction
        title="Xác nhận kích hoạt tài khoản"
        description="Bạn có chắc chắn muốn kích hoạt tài khoản này không?"
        action={() => updateEmployerStatus({ status: UserStatus.ACTIVE })}
        button={
          <Button variant="outline">
            <Check />
          </Button>
        }
      />
    );
  }
  if (status === UserStatus.BANNED) {
    return (
      <ConfirmAction
        title="Xác nhận mở khóa tài khoản"
        description="Bạn có chắc chắn muốn mở khóa tài khoản này không?"
        action={() => updateEmployerStatus({ status: UserStatus.ACTIVE })}
        button={
          <Button variant="outline">
            <CiUnlock />
          </Button>
        }
      />
    );
  }
}
