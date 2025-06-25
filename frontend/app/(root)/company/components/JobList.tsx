import { IJob } from '@/apiService/job/interface';
import JobItem from '@/components/JobItem';
interface IProps {
  jobs: IJob[];
}

export default function JobList({ jobs }: IProps) {
  return (
    <ul className="space-y-2 h-auto lg:max-h-screen overflow-auto scrollbar-hide">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobItem job={job} navtoDetail={true} showStatus={false} />
        </li>
      ))}
    </ul>
  );
}
