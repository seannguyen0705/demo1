import Filter from './components/Filter';
import FilterSmallScreen from './components/FilterSmallScreen';
import OrderBy from '@/app/(root)/job/components/OrderBy';
import JobList from './components/JobList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý việc làm cho nhà tuyển dụng',
  description: 'Quản lý việc làm của bạn | Xem danh sách việc làm, thêm, sửa, xóa việc làm',
};
export default function ManageJobs() {
  return (
    <main className="flex flex-col container mx-auto gap-4 px-2 lg:px-4">
      <div className="flex items-center justify-between container mx-auto px-2">
        <Filter />
        <FilterSmallScreen isEmployer={true} />
        <OrderBy />
      </div>
      <JobList />
    </main>
  );
}
