import useEmployerGetJobs from '../hooks/useEmployerGetJobs';
import JobItem from '@/components/JobItem';
import { useRouter, useSearchParams } from 'next/navigation';
import ManageJobDetail from './ManageJobDetail';
import useQueryParams from '@/app/hooks/useQueryParams';
import { useEffect } from 'react';
import Pagination from '@/components/Pagination';

export default function EmployerJobList() {
  const searchParams = useSearchParams();
  const { handleClear } = useQueryParams();
  const { data, isLoading } = useEmployerGetJobs(handleClear('job_selected'));
  const jobId = searchParams.get('job_selected') || data?.data.jobs[0]?.id;
  const router = useRouter();

  useEffect(() => {
    if (jobId) {
      router.replace(`?${handleClear('job_selected')}`, { scroll: false });
    }
  }, [handleClear('job_selected')]);

  if (!data || isLoading) {
    return;
  }
  const totalPages = Math.ceil(data?.data.total / 10);

  return (
    <div className="flex gap-4 container mx-auto mt-[30px] px-2">
      <div className="w-full lg:w-[500px]">
        <h3 className="text-xl lg:text-2xl font-bold mb-3">Tìm thấy {data?.data.total} việc làm</h3>
        <ul className="h-auto max-h-screen overflow-auto space-y-4">
          {data?.data.jobs.map((job) => (
            <li
              key={job.id}
              className={`rounded-lg ${jobId === job.id ? 'bg-light-green dark:bg-gray-900 dark:border-gray-800 border-green border' : ''}`}
            >
              <JobItem job={job} navtoDetail={false} showStatus={true} />
            </li>
          ))}
        </ul>
      </div>
      {jobId && <ManageJobDetail jobId={jobId} />}
    </div>
  );
}
