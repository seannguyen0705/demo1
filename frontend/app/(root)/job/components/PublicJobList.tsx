import { SearchParams } from '@/api/interface';
import { getJobById, getJobs } from '@/api/job/query';
import JobItem from '@/components/JobItem';
import Pagination from '@/components/Pagination';
import JobDetail from './JobDetail';
import NotFoundJob from './NotFoundJob';

interface IProps {
  searchParams: SearchParams;
}

export default async function PublicJobList({ searchParams }: IProps) {
  const urlSearchParams = new URLSearchParams(searchParams as Record<string, string>);
  urlSearchParams.delete('job_selected');
  const queryString = urlSearchParams.toString();
  const jobs = await getJobs(queryString);
  const totalPages = Math.ceil(jobs.data.total / 10);
  const jobId = searchParams.job_selected || jobs.data.jobs[0]?.id;

  let job = undefined;
  if (jobId && typeof jobId === 'string') {
    job = await getJobById(jobId);
  }

  return (
    <div className="flex gap-4 container mx-auto mt-[30px] px-2">
      {jobs.data.jobs.length === 0 ? (
        <NotFoundJob />
      ) : (
        <div className="w-full lg:w-[500px]">
          <h3 className="text-xl lg:text-2xl font-bold mb-3">Tìm thấy {jobs.data.total} việc làm</h3>
          <ul className="h-auto max-h-[calc(100vh-150px)] overflow-auto space-y-4">
            {jobs.data.jobs.map((job) => (
              <li
                key={job.id}
                className={`rounded-lg ${jobId === job.id ? 'bg-light-green dark:bg-gray-900 dark:border-gray-800 border-green border' : ''}`}
              >
                <div className="hidden lg:block">
                  <JobItem job={job} navtoDetail={false} showStatus={false} />
                </div>
                <div className="lg:hidden">
                  <JobItem job={job} navtoDetail={true} showStatus={false} />
                </div>
              </li>
            ))}
            <div className="my-3">
              <Pagination totalPages={totalPages} currentPage={jobs.data.currentPage} />
            </div>
          </ul>
        </div>
      )}
      {job && <JobDetail job={job.data} isAuth={false} />}
    </div>
  );
}
