import { IJob } from '@/api/job/interface';
import JobSaveItem from './JobSaveItem';

interface IProps {
  jobs: IJob[];
}

export default function JobSaveList({ jobs }: IProps) {
  return (
    <div className="flex flex-col">
      {jobs.map((job) => (
        <JobSaveItem key={job.id} job={job} />
      ))}
    </div>
  );
}
