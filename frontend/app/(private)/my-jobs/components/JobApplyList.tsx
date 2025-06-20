import { IJob } from '@/api/job/interface';
import JobApplyItem from './JobApplyItem';

interface IProps {
  jobs: IJob[];
}

export default function JobApplyList({ jobs }: IProps) {
  return (
    <div className="flex flex-col">
      {jobs.map((job) => (
        <JobApplyItem key={job.id} job={job} />
      ))}
    </div>
  );
}
