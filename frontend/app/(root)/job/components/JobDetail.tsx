import JobHeader from './JobHeader';
import JobInfo from './JobInfo';
import JobRequirement from './JobRequirement.';
import JobDescription from './JobDescription';
import JobBenefit from './JobBenefit';
import { IJob } from '@/api/job/interface';
interface IProps {
  job: IJob;
  isAuth: boolean;
}

export default function JobDetail({ job, isAuth }: IProps) {
  return (
    <main className="mt-11 hidden lg:block rounded-lg p-6 dark:bg-gray-900 bg-light-green space-y-4  flex-1">
      <JobHeader job={job} isAuth={isAuth} />
      <div className="h-auto max-h-[calc(100vh-360px)] overflow-auto">
        <JobInfo job={job} />
        <JobDescription job={job} />
        <JobRequirement job={job} />
        <JobBenefit job={job} />
      </div>
    </main>
  );
}
