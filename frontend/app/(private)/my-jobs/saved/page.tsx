'use client';

import Link from 'next/link';
import useCandidateGetJobSaved from '../hooks/useCandidateGetJobSave';
import useCandidateGetJobApply from '../hooks/useCandidateGetJobApply';
import { useSearchParams } from 'next/navigation';
import Pagination from '@/components/Pagination';
import OrderBy from '@/app/(root)/job/components/OrderBy';
import JobSaveList from '../Components/JobSaveList';
import NotFoundJob from '@/app/(root)/job/components/NotFoundJob';

export default function SavedJobs() {
  const searchParams = useSearchParams();

  const { data: appliedData } = useCandidateGetJobApply({ queryString: searchParams.toString() });
  const { data: savedData } = useCandidateGetJobSaved({ queryString: searchParams.toString() });

  if (!appliedData || !savedData) {
    return;
  }
  const totalPages = savedData?.total / 10;
  return (
    <main className="flex flex-col  px-4">
      <header>
        <h3 className="text-2xl font-bold">Việc làm đã ứng tuyển</h3>
        <nav className="flex gap-4 items-center">
          <Link href="/my-jobs/applied" className="py-2 border-b-2 hover:border-green flex items-center gap-2">
            Đã ứng tuyển
            <span className="text-sm px-2 py-1 bg-gray-200 text-gray-500 rounded-full">
              {appliedData?.total > 9 ? '9+' : appliedData?.total}
            </span>
          </Link>
          <Link
            href="/my-jobs/saved"
            className="border-b-2 flex items-center gap-2 py-2 font-bold text-green border-green"
          >
            Đã lưu
            <span className="text-sm px-2 py-1 bg-green text-white rounded-full">
              {savedData?.total > 9 ? '9+' : savedData?.total}
            </span>
          </Link>
        </nav>
      </header>
      <div className="flex justify-end mb-3">
        <OrderBy />
      </div>
      {savedData.jobs.length === 0 ? (
        <NotFoundJob title="Không có việc làm đã lưu" />
      ) : (
        <>
          <JobSaveList jobs={savedData.jobs} />
          <div className="my-3">
            <Pagination totalPages={totalPages} currentPage={savedData.currentPage} />
          </div>
        </>
      )}
    </main>
  );
}
