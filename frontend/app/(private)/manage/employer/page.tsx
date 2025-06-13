'use client';

import SearchAndFilter from './components/SearchAndFilter';
import TableEmployer from './components/TableEmployer';

export default function ManageEmployer() {
  return (
    <main className="sm:px-4 px-2 w-full">
      <h3 className="text-2xl font-bold">Quản lý nhà tuyển dụng</h3>
      <p className="text-sm text-gray-500 mb-4">Quản lý danh sách nhà tuyển dụng đã đăng ký vào hệ thống.</p>
      {/* Filters and Search */}
      <SearchAndFilter />

      {/* Table */}
      <TableEmployer />
    </main>
  );
}
