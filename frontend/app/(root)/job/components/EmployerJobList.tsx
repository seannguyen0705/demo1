import useEmployerGetJobs from '../hooks/useEmployerGetJobs';
import JobItem from '@/components/JobItem';
import { useSearchParams } from 'next/navigation';
import ManageJobDetail from './ManageJobDetail';
import useQueryJob from '../hooks/useQueryJob';
import Pagination from '@/components/Pagination';
import NotFoundJob from './NotFoundJob';

export default function EmployerJobList() {
  const searchParams = useSearchParams();
  const { handleClear } = useQueryJob();
  const { data } = useEmployerGetJobs(handleClear('job_selected'));
  const jobId = searchParams.get('job_selected') || data?.data.jobs[0]?.id;

  if (!data) {
    return;
  }
  const totalPages = Math.ceil(data?.data.total / 10);

  return (
    <div className="flex gap-4 container mx-auto mt-[30px] px-2">
      {data.data.jobs.length === 0 ? (
        <NotFoundJob />
      ) : (
        <div className="w-full lg:w-[500px]">
          <h3 className="text-xl lg:text-2xl font-bold mb-3">Tìm thấy {data?.data.total} việc làm</h3>
          <ul className="h-auto max-h-[calc(100vh-150px)] overflow-auto space-y-4">
            {data?.data.jobs.map((job) => (
              <li
                key={job.id}
                className={`rounded-lg ${jobId === job.id ? 'bg-light-green dark:bg-gray-900 dark:border-gray-800 border-green border' : ''}`}
              >
                <div className="hidden lg:block">
                  <JobItem job={job} navtoDetail={false} showStatus={true} />
                </div>{' '}
                <div className="lg:hidden">
                  <JobItem job={job} navtoDetail={true} showStatus={true} />
                </div>
              </li>
            ))}
            <div className="my-3">
              <Pagination totalPages={totalPages} currentPage={data?.data.currentPage} />
            </div>
          </ul>
        </div>
      )}
      {jobId && <ManageJobDetail jobId={jobId} />}
    </div>
  );
}
