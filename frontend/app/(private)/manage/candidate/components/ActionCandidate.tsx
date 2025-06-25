import DialogProfile from './DialogProfile';
import ActionStatus from './ActionStatus';
import ConfirmDeleteCandidate from './ConfirmDeleteCandidate';
import { IUser } from '@/apiService/interface';
interface IProps {
  candidate: IUser;
}
export default function ActionCandidate({ candidate }: IProps) {
  return (
    <div className="flex items-center gap-2 justify-end">
      <DialogProfile candidateId={candidate.id} />
      <ActionStatus candidate={candidate} />
      <ConfirmDeleteCandidate candidate={candidate} />
    </div>
  );
}
