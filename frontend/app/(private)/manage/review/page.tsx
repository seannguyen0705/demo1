'use client';

import SearchReview from './components/SearchReview';
import TableReview from './components/TableReview';
export default function ManageReview() {
  return (
    <main className="sm:px-4 px-2 w-full">
      <h3 className="text-2xl font-bold">Quản lý đánh giá</h3>
      <p className="text-sm text-gray-500 mb-4">Quản lý danh sách đánh giá về công ty.</p>
      <SearchReview />
      <TableReview />
    </main>
  );
}
