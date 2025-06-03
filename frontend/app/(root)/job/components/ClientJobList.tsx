import useGetJobs from '../hooks/useGetJobs';
import useQueryJob from '../hooks/useQueryJob';
import { useSearchParams } from 'next/navigation';
import NotFoundJob from './NotFoundJob';
import JobItem from '@/components/JobItem';
import Pagination from '@/components/Pagination';
import useGetJobById from '../hooks/useGetJobById';
import JobDetail from './JobDetail';

export default function ClientJobList() {
  const searchParams = useSearchParams();
  const { handleClear } = useQueryJob();
  const { data } = useGetJobs(handleClear('job_selected'));
  const jobId = searchParams.get('job_selected') || data?.data.jobs[0]?.id;
  const { data: job } = useGetJobById(jobId as string);

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
          <h3 className="text-xl lg:text-2xl fobdont-bold mb-3">Tìm thấy {data?.data.total} việc làm</h3>
          <ul className="h-auto max-h-[calc(100vh-150px)] overflow-auto space-y-4">
            {data?.data.jobs.map((job) => (
              <li
                key={job.id}
                className={`rounded-lg ${jobId === job.id ? 'bg-light-green dark:bg-gray-900 dark:border-gray-800 border-green border' : ''}`}
              >
                <JobItem job={job} navtoDetail={false} showStatus={false} />
              </li>
            ))}
            <div className="my-3">
              <Pagination totalPages={totalPages} currentPage={data?.data.currentPage} />
            </div>
          </ul>
        </div>
      )}
      {jobId && job && <JobDetail job={job.data} />}
    </div>
  );
}
