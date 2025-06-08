'use client';

import Link from 'next/link';
import useCandidateGetJobApply from '../hooks/useCandidateGetJobApply';
import JobApplyList from '../Components/JobApplyList';
import Pagination from '@/components/Pagination';
import { useSearchParams } from 'next/navigation';
import OrderBy from '@/app/(root)/job/components/OrderBy';
import useCandidateGetJobSaved from '../hooks/useCandidateGetJobSave';
import NotFoundJob from '@/app/(root)/job/components/NotFoundJob';
export default function AppliedJobs() {
  const searchParams = useSearchParams();

  const { data: appliedData } = useCandidateGetJobApply({ queryString: searchParams.toString() });
  const { data: savedData } = useCandidateGetJobSaved({ queryString: searchParams.toString() });

  if (!appliedData || !savedData) {
    return;
  }
  const totalPages = appliedData?.total / 10;
  return (
    <main className="flex flex-col px-4">
      <header>
        <h3 className="text-2xl font-bold">Việc làm đã ứng tuyển</h3>
        <nav className="flex gap-4 items-center">
          <Link
            href="/my-jobs/applied"
            className="border-b-2 flex items-center gap-2 py-2 font-bold text-green border-green"
          >
            Đã ứng tuyển
            <span className="text-sm px-2 py-1 bg-green text-white rounded-full">
              {appliedData?.total > 9 ? '9+' : appliedData?.total}
            </span>
          </Link>
          <Link href="/my-jobs/saved" className="py-2 border-b-2 hover:border-green flex items-center gap-2">
            Đã lưu
            <span className="text-sm px-2 py-1 bg-gray-200 text-gray-500 rounded-full">
              {savedData?.total > 9 ? '9+' : savedData?.total}
            </span>
          </Link>
        </nav>
      </header>
      <div className="flex justify-end mb-3">
        <OrderBy />
      </div>

      {appliedData.jobs.length === 0 ? (
        <NotFoundJob title="Không có việc làm đã ứng tuyển" />
      ) : (
        <>
          <JobApplyList jobs={appliedData.jobs} />
          <div className="my-3">
            <Pagination totalPages={totalPages} currentPage={appliedData.currentPage} />
          </div>
        </>
      )}
    </main>
  );
}
