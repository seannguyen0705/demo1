import { UserStatus } from '@/utils/enums';

import ConfirmAction from '@/app/(private)/manage-candidates/components/ConfirmAction';
import { Button } from '@/components/ui/button';
import { CiLock, CiUnlock } from 'react-icons/ci';
import { Check } from 'lucide-react';
import useUpdateCandidateStatus from '../hooks/useUpdateEmployerStatus';
interface IProps {
  candidateId: string;
  status: UserStatus;
}

export default function ActionStatus({ candidateId, status }: IProps) {
  const { mutate: updateCandidateStatus, isPending } = useUpdateCandidateStatus({ id: candidateId });
  if (status === UserStatus.ACTIVE) {
    return (
      <ConfirmAction
        title="Xác nhận khóa tài khoản"
        disabled={isPending}
        description="Bạn có chắc chắn muốn khóa tài khoản này không?"
        action={() => updateCandidateStatus({ status: UserStatus.BANNED })}
        button={
          <Button variant="outline" className="text-red-500 shadow-md">
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
        disabled={isPending}
        description="Bạn có chắc chắn muốn kích hoạt tài khoản này không?"
        action={() => updateCandidateStatus({ status: UserStatus.ACTIVE })}
        button={
          <Button variant="outline" className="text-green-500 shadow-md">
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
        disabled={isPending}
        description="Bạn có chắc chắn muốn mở khóa tài khoản này không?"
        action={() => updateCandidateStatus({ status: UserStatus.ACTIVE })}
        button={
          <Button variant="outline" className="text-green-500 shadow-md">
            <CiUnlock />
          </Button>
        }
      />
    );
  }
}
