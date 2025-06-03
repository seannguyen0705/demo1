import { cookies } from 'next/headers';
import AuthJobList from './components/AuthJobList';
import JobList from './components/JobList';
import Filter from './components/Filter';
import SearchJob from './components/SearchJob';
import OrderBy from './components/OrderBy';
import FilterSmallScreen from './components/FilterSmallScreen';
interface IProps {
  searchParams: Promise<{
    keyword: string;
    provinceName: string;
    minSalary: string;
    maxSalary: string;
    sort: string;
  }>;
}

export default async function JobPage({ searchParams }: IProps) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.has('Authentication') || cookieStore.has('Refresh');
  const { keyword } = await searchParams;
  return (
    <>
      <div className="">
        <SearchJob keyword={keyword} />
        <div className="flex items-center justify-between container mx-auto px-2">
          <Filter />
          <FilterSmallScreen isAuth={isAuth} />
          <OrderBy />
        </div>
        <div className="">{isAuth ? <AuthJobList /> : <JobList />}</div>
      </div>
    </>
  );
}
