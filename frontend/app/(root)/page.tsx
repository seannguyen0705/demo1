import SearchHome from '../components/SearchHome';
import TopCompany from '../components/TopCompany';
import NewestJobs from '../components/NewestJobs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trang Chủ | Tìm Việc Làm Mơ Ước',
  description: 'Tìm kiếm công việc mơ ước của bạn ngay hôm nay tại nền tảng tuyển dụng hàng đầu Việt Nam.',
  keywords: ['việc làm', 'tuyển dụng', 'công việc mơ ước', 'tìm việc', 'việc làm IT', 'việc làm mới'],
};

export default function Home() {
  return (
    <>
      <SearchHome />
      <TopCompany />
      <NewestJobs />
    </>
  );
}
