import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';
import DialogProfile from './DialogProfile';
import { UserStatus } from '@/utils/enums';
import ActionStatus from './ActionStatus';
interface IProps {
  candidateId: string;
  status: UserStatus;
}
export default function ActionCandidate({ candidateId, status }: IProps) {
  return (
    <div className="flex items-center gap-2 justify-end">
      <DialogProfile candidateId={candidateId} />
      <ActionStatus candidateId={candidateId} status={status} />
      <Button>
        <UserRound />
      </Button>
    </div>
  );
}
