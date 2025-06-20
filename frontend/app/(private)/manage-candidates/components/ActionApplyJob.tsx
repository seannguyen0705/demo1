import { IApplyJob } from '@/api/apply-job/interface';
import DialogProfile from './DialogProfile';
import DialogApplyJob from './DialogApplỵJob';

interface IProps {
  applyJob: IApplyJob;
}

export default function ActionApplyJob({ applyJob }: IProps) {
  return (
    <div className="flex items-center gap-2">
      <DialogProfile candidateId={applyJob.candidateId} />
      <DialogApplyJob applyJobId={applyJob.id} />
    </div>
  );
}
