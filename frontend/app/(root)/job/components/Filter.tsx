import { JobTypeFilter } from './JobTypeFIlter';
import { LevelFilter } from './LevelFilter';
import { SalaryFilter } from './SalaryFilter';
import ProvinceFilter from './ProvinceFilter';
import { cookies } from 'next/headers';
import StatusFilter from './StatusFilter';

export default async function Filter() {
  const cookieStore = await cookies();
  const isAuth = cookieStore.has('Refresh') || cookieStore.has('Authentication');
  return (
    <div className="hidden lg:flex items-center gap-2">
      <LevelFilter />
      <JobTypeFilter />
      <SalaryFilter />
      <ProvinceFilter />
      {isAuth && <StatusFilter />}
    </div>
  );
}
