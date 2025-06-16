import { UserStatus } from '@/utils/enums';

import ConfirmAction from '@/app/(private)/manage-candidates/components/ConfirmAction';
import { Check } from 'lucide-react';
import useUpdateCandidateStatus from '../hooks/useUpdateCandidateStatus';
import ConfirmBanCandidate from './ConfirmBanCandidate';
import { IUser } from '@/api/interface';
import ConfirmUnbanCandidate from './ConfirmUnbanCandidate';
interface IProps {
  candidate: IUser;
}

export default function ActionStatus({ candidate }: IProps) {
  const { mutate: updateCandidateStatus, isPending } = useUpdateCandidateStatus({ id: candidate.id });
  if (candidate.status === UserStatus.ACTIVE) {
    return <ConfirmBanCandidate candidate={candidate} />;
  } else if (candidate.status === UserStatus.INACTIVE) {
    return (
      <ConfirmAction
        title="Xác nhận kích hoạt tài khoản"
        disabled={isPending}
        description="Bạn có chắc chắn muốn kích hoạt tài khoản này không?"
        action={() => updateCandidateStatus({ status: UserStatus.ACTIVE })}
        button={
          <button className="text-green-500 p-2 rounded-md border shadow-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <Check className="h-3 w-3" />
          </button>
        }
      />
    );
  } else if (candidate.status === UserStatus.BANNED) {
    return <ConfirmUnbanCandidate candidate={candidate} />;
  }
}
