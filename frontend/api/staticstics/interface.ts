interface IStaticsticsCount {
  countJobs: number;
  countCompanies: number;
  countCandidates: number;
  countApplyJobs: number;
}

interface CountDate {
  count: number;
  date: string;
}

interface IStaticsticsCountIn6MonthsAgo {
  jobs: CountDate[];
  employers: CountDate[];
  candidates: CountDate[];
  applyJobs: CountDate[];
}

export type { IStaticsticsCount, CountDate, IStaticsticsCountIn6MonthsAgo };
