'use client';

import useGetJobById from '../hooks/useGetJobById';

import ManageJobHeader from './ManageJobHeader';
import JobInfo from './JobInfo';
import JobDescription from './JobDescription';
import JobRequirement from './JobRequirement.';
import JobBenefit from './JobBenefit';
interface IProps {
  jobId: string;
}

export default function ManageJobDetail({ jobId }: IProps) {
  const { data: job, isLoading } = useGetJobById(jobId);
  if (!job || isLoading) {
    return;
  }
  return (
    <main className="mt-11 hidden lg:block rounded-lg p-6 dark:bg-gray-900 bg-light-green space-y-4  flex-1">
      <ManageJobHeader job={job.data} />
      <div className="h-auto max-h-[calc(100vh-360px)] overflow-auto">
        <JobInfo job={job.data} />
        <JobDescription job={job.data} />
        <JobRequirement job={job.data} />
        <JobBenefit job={job.data} />
      </div>
    </main>
  );
}
