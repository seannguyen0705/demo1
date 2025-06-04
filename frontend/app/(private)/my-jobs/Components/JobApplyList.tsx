import { IJob } from '@/api/job/interface';
import JobApplyItem from './JobApplyItem';

interface IProps {
  jobs: IJob[];
}

export default function JobApplyList({ jobs }: IProps) {
  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <JobApplyItem key={job.id} job={job} />
      ))}
    </div>
  );
}
