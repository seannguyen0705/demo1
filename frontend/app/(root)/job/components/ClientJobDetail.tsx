'use client';
import JobInfo from './JobInfo';
import JobRequirement from './JobRequirement.';
import JobDescription from './JobDescription';
import JobBenefit from './JobBenefit';
import { IJob } from '@/api/job/interface';
import ClientJobHeader from './ClientJobHeader';
interface IProps {
  job: IJob;
}

export default function ClientJobDetail({ job }: IProps) {
  return (
    <main className="mt-11 hidden lg:block rounded-lg p-6 dark:bg-gray-900 bg-light-green space-y-4  flex-1">
      <ClientJobHeader job={job} />
      <div id="job-detail" className="h-auto max-h-[calc(100vh-360px)] overflow-auto">
        <JobInfo job={job} isCandidate={true} />
        <JobDescription job={job} />
        <JobRequirement job={job} />
        <JobBenefit job={job} />
      </div>
    </main>
  );
}
