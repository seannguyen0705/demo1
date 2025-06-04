'use client';

import Link from 'next/link';

export default function SavedJobs() {
  return (
    <main className="flex flex-col px-4">
      <h3 className="text-2xl font-bold">Việc làm đã lưu</h3>
      <nav className="flex gap-4 items-center">
        <Link href="/my-jobs/applied" className="py-2 flex items-center gap-2">
          Đã ứng tuyển
          <span className="text-sm px-2 py-1 bg-green text-white rounded-full">{3}</span>
        </Link>
        <Link
          href="/my-jobs/saved"
          className="border-b-2 flex items-center gap-2 py-2 font-bold text-green border-green"
        >
          Đã lưu
          <span className="text-sm px-2 py-1 bg-green text-white rounded-full">{0}</span>
        </Link>
      </nav>
    </main>
  );
}
