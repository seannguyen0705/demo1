import { getJobs } from '@/api/job/query';
import { SortJob } from '@/utils/enums';
import JobCard from './JobCard';

export default async function JobList() {
  const query = { page: '1', limit: '10', sort: SortJob.NEWEST };
  const queryString = new URLSearchParams(query).toString();
  const jobs = await getJobs(queryString);
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.data.jobs.map((job, index) => (
        <li key={job.id} className={`${index === 9 && 'lg:hidden'}`}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
