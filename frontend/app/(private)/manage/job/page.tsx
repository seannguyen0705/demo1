'use client';

import TableJob from './components/TableJob';
import SearchAndFilter from './components/SearchAndFilter';
export default function ManageJob() {
  return (
    <main className="sm:px-4 px-2 w-full">
      <h3 className="text-2xl font-bold">Quản lý việc làm</h3>
      <p className="text-sm text-gray-500 mb-4">Quản lý danh sách việc làm đã đăng ký vào hệ thống.</p>
      <SearchAndFilter />
      <TableJob />
    </main>
  );
}
