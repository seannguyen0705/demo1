import { IQueryJob } from '@/api/job/interface';
import Filter from './components/Filter';
import OrderBy from './components/OrderBy';
import { cookies } from 'next/headers';
import AuthJobList from './components/AuthJobList';
import JobList from './components/JobList';
import JobDetail from './JobDetail';
interface IProps {
  searchParams: Promise<IQueryJob>;
}
export default async function JobPage({ searchParams }: IProps) {
  const queryJob = await searchParams;
  const cookieStore = await cookies();
  const isAuth = cookieStore.has('Authentication') || cookieStore.has('Refresh');
  return (
    <>
      <div className="flex gap-4 container mx-auto mt-[30px]">
        <div className="lg:w-[500px]">{isAuth ? <AuthJobList queryJob={queryJob} /> : <JobList />}</div>
        <JobDetail jobId={queryJob.job_selected || ''} />
      </div>
    </>
  );
}
