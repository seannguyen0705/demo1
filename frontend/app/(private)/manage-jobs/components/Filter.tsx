import ProvinceFilter from '@/app/(root)/job/components/ProvinceFilter';
import { JobTypeFilter } from '@/app/(root)/job/components/JobTypeFIlter';
import { LevelFilter } from '@/app/(root)/job/components/LevelFilter';
import { cookies } from 'next/headers';
import { SalaryFilter } from '@/app/(root)/job/components/SalaryFilter';
import StatusFilter from '@/app/(root)/job/components/StatusFilter';

export default async function Filter() {
  const cookieStore = await cookies();
  const isAuth = cookieStore.has('Refresh') || cookieStore.has('Authentication');
  return (
    <div className="hidden xl:flex items-center gap-2">
      <LevelFilter />
      <JobTypeFilter />
      <SalaryFilter />
      <ProvinceFilter />
      {isAuth && <StatusFilter />}
    </div>
  );
}
