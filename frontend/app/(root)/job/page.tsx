import { cookies } from 'next/headers';
import AuthJobList from './components/AuthJobList';
import Filter from './components/Filter';
import SearchJob from './components/SearchJob';
import OrderBy from './components/OrderBy';
import FilterSmallScreen from './components/FilterSmallScreen';
import PublicJobList from './components/PublicJobList';
import { SearchParams } from '@/apiService/interface';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Tìm việc làm',
  description: 'Tìm việc làm dễ dàng với Job Portal',
};

interface IProps {
  searchParams: Promise<SearchParams>;
}

export default async function JobPage({ searchParams }: IProps) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.has('Authentication') || cookieStore.has('Refresh');
  const queryParams = await searchParams;
  let { keyword } = queryParams;
  if (Array.isArray(keyword)) {
    keyword = keyword[0];
  }

  return (
    <main className="min-h-[80vh]">
      <SearchJob keyword={keyword || ''} />
      <div className="flex items-center justify-between container mx-auto px-2">
        <Filter />
        <FilterSmallScreen isEmployer={false} />
        <OrderBy />
      </div>
      {isAuth ? <AuthJobList /> : <PublicJobList searchParams={queryParams} />}
    </main>
  );
}
