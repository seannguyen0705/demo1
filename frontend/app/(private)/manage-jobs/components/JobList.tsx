'use client';

import useEmployerGetJobs from '@/app/(root)/job/hooks/useEmployerGetJobs';

import Pagination from '@/components/Pagination';
import { useSearchParams } from 'next/navigation';
import ManageJobItem from './ManageJobItem';

export default function JobList() {
  const searchParams = useSearchParams();

  const { data } = useEmployerGetJobs(searchParams.toString());

  if (!data) {
    return;
  }
  const totalPages = Math.ceil(data?.data.total / 10);

  return (
    <section className="">
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data?.data.jobs.map((job) => (
          <li key={job.id}>
            <ManageJobItem job={job} />
          </li>
        ))}
      </ul>
      <div className="my-3">
        <Pagination totalPages={totalPages} currentPage={data.data.currentPage} />
      </div>
    </section>
  );
}
