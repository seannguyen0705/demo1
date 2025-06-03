import { IQueryJob } from '@/api/job/interface';
import useEmployerGetJobs from '../hooks/useEmployerGetJobs';
import JobItem from '@/components/JobItem';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface IProps {
  queryJob: IQueryJob;
}
export default function EmployerJobList({ queryJob }: IProps) {
  const { data, isLoading } = useEmployerGetJobs(queryJob);

  const router = useRouter();

  useEffect(() => {
    if (data?.data.jobs[0]?.id) {
      const params = new URLSearchParams(window.location.search);
      params.set('job_selected', data?.data.jobs[0].id);
      router.replace(`?${params.toString()}`);
    }
  }, [data?.data.jobs[0]?.id]);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-3">Tìm thấy {data?.data.total} việc làm</h3>
      <ul className="h-auto max-h-screen overflow-auto space-y-4">
        {data?.data.jobs.map((job) => (
          <li key={job.id}>
            <JobItem job={job} />
          </li>
        ))}
      </ul>
    </div>
  );
}
