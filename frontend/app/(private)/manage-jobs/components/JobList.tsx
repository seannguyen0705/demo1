'use client';

import useEmployerGetJobs from '@/app/(root)/job/hooks/useEmployerGetJobs';

import Pagination from '@/components/Pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import ManageJobItem from './ManageJobItem';
import { Button } from '@/components/ui/button';
export default function JobList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: jobQuery } = useEmployerGetJobs(searchParams.toString());
  if (!jobQuery) {
    return;
  }

  if (jobQuery.total === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <h6 className="text-2xl font-bold">Không tìm thấy việc làm đang tuyển dụng</h6>
        <Button onClick={() => router.push('/create-job')}>Tạo việc làm</Button>
      </div>
    );
  }
  const totalPages = Math.ceil(jobQuery.total / 10);

  return (
    <section className="">
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {jobQuery.jobs.map((job) => (
          <li key={job.id}>
            <ManageJobItem job={job} />
          </li>
        ))}
      </ul>
      <div className="my-8">
        <Pagination totalPages={totalPages} currentPage={jobQuery.currentPage} />
      </div>
    </section>
  );
}
