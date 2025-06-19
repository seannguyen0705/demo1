'use client';
import useGetStaticstic6MonthsAgo from '../hooks/useGetStaticstic6MonthsAgo';
import CountApplication from './CountApplication';
import CountCandidate from './CountCandidate';
import CountEmployer from './CountEmployer';
import CountJob from './CountJob';
import { StaticsticsApplyJob } from './StaticsticsApplyJob';
import { StaticsticsCandidate } from './StaticsticsCandidate';
import { StaticsticsEmployer } from './StaticsticsEmployer';
import { StaticsticsJob } from './StaticsticsJob';

export default function Content() {
  const { data, isLoading } = useGetStaticstic6MonthsAgo();
  if (isLoading) {
    return;
  }
  return (
    <main className="sm:px-4 px-2 w-full">
      <h3 className="text-2xl font-bold mb-4">Tổng quan</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CountJob dataJobs={data?.jobs || []} />
        <CountCandidate dataCandidates={data?.candidates || []} />
        <CountEmployer dataEmployers={data?.employers || []} />
        <CountApplication dataApplications={data?.applyJobs || []} />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <StaticsticsJob dataJobs={data?.jobs || []} />
        <StaticsticsCandidate dataCandidates={data?.candidates || []} />
        <StaticsticsEmployer dataEmployers={data?.employers || []} />
        <StaticsticsApplyJob dataApplyJobs={data?.applyJobs || []} />
      </div>
    </main>
  );
}
