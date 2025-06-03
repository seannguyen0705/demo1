import { JobTypeFilter } from './JobTypeFIlter';
import { LevelFilter } from './LevelFilter';
import { SalaryFilter } from './SalaryFilter';
export default function Filter() {
  return (
    <div className="flex items-center gap-2 max-w-[1000px] mx-auto">
      <LevelFilter />
      <JobTypeFilter />
      <SalaryFilter />
    </div>
  );
}
