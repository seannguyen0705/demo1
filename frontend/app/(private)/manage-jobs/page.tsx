import Filter from './components/Filter';
import FilterSmallScreen from './components/FilterSmallScreen';
import OrderBy from '@/app/(root)/job/components/OrderBy';
import JobList from './components/JobList';
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
