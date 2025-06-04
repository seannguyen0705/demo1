'use client';

import Link from 'next/link';
import useCandidateGetJobApply from '../hooks/useCandidateGetJobApply';
import JobApplyList from '../Components/JobApplyList';
import Pagination from '@/components/Pagination';
import { useSearchParams } from 'next/navigation';
import OrderBy from '@/app/(root)/job/components/OrderBy';
import { Suspense } from 'react';
export default function AppliedJobs() {
  const searchParams = useSearchParams();

  const { data } = useCandidateGetJobApply({ queryString: searchParams.toString() });
  const count = data?.total;
  if (!data) {
    return;
  }
  const totalPages = data.total / 10;
  return (
    <Suspense>
      <main className="flex flex-col  px-4">
        <header>
          <h3 className="text-2xl font-bold">Việc làm đã ứng tuyển</h3>
          <nav className="flex gap-4 items-center">
            <Link
              href="/my-jobs/applied"
              className="border-b-2 flex items-center gap-2 py-2 font-bold text-green border-green"
            >
              Đã ứng tuyển
              <span className="text-sm px-2 py-1 bg-green text-white rounded-full">{count}</span>
            </Link>
            <Link href="/my-jobs/saved" className="py-2 flex items-center gap-2">
              Đã lưu
              <span className="text-sm px-2 py-1 bg-green text-white rounded-full">{0}</span>
            </Link>
          </nav>
        </header>
        <div className="flex justify-end mb-3">
          <OrderBy />
        </div>

        <JobApplyList jobs={data.jobs} />
        <div className="my-3">
          <Pagination totalPages={totalPages} currentPage={data.currentPage} />
        </div>
      </main>
    </Suspense>
  );
}
