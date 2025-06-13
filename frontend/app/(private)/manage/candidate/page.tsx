'use client';

import TableCandidate from './components/TableCandidate';
import SearchAndFilter from './components/SearchAndFilter';
export default function ManageCandidate() {
  return (
    <main className="sm:px-4 px-2 w-full">
      <h3 className="text-2xl font-bold">Quản lý ứng viên</h3>
      <p className="text-sm text-gray-500 mb-4">Quản lý danh sách ứng viên đã đăng ký vào hệ thống.</p>
      {/* Filters and Search */}
      <SearchAndFilter />

      {/* Table */}
      <TableCandidate />
      {/* </CardContent>
      </Card> */}
    </main>
  );
}
