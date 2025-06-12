import { Button } from '@/components/ui/button';
import { Trash2, UserRound } from 'lucide-react';
import DialogProfile from './DialogProfile';
import { UserStatus } from '@/utils/enums';
import ActionStatus from './ActionStatus';

import ConfirmAction from '@/app/(private)/manage-candidates/components/ConfirmAction';
import useDeleteCandidate from '../hooks/deleteCandidate';
interface IProps {
  candidateId: string;
  status: UserStatus;
}
export default function ActionCandidate({ candidateId, status }: IProps) {
  const { mutate: deleteCandidate, isPending } = useDeleteCandidate();
  return (
    <div className="flex items-center gap-2 justify-end">
      <DialogProfile candidateId={candidateId} />
      <ActionStatus candidateId={candidateId} status={status} />
      <ConfirmAction
        title="Xóa tài khoản"
        description="Bạn có chắc chắn muốn xóa tài khoản này không?"
        action={() => deleteCandidate(candidateId)}
        button={
          <Button variant="outline" className="text-red-500 shadow-md" disabled={isPending}>
            <Trash2 className="w-4 h-4" />
          </Button>
        }
      />
    </div>
  );
}
