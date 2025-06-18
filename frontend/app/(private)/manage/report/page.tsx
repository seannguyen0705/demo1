'use client';

import SearchReport from './components/SearchReport';
import TableReport from './components/TableReport';
export default function ManageReport() {
  return (
    <main className="sm:px-4 px-2 w-full">
      <h3 className="text-2xl font-bold">Quản lý báo cáo</h3>
      <p className="text-sm text-gray-500 mb-4">Quản lý danh sách báo cáo vấn đề của người dùng.</p>
      <SearchReport />
      <TableReport />
    </main>
  );
}
