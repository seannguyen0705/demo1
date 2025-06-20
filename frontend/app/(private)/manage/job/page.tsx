import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý việc làm',
  description: 'Quản lý danh sách việc làm đã gửi lên hệ thống.',
};

import TableJob from './components/TableJob';
import SearchJob from './components/SearchJob';
export default function ManageJob() {
  return (
    <main className="sm:px-4 px-2 w-full">
      <h3 className="text-2xl font-bold">Quản lý việc làm</h3>
      <p className="text-sm text-gray-500 mb-4">Quản lý danh sách việc làm đã gửi lên hệ thống.</p>
      <SearchJob />
      <TableJob />
    </main>
  );
}
