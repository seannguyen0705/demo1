interface IExperience {
  id: string;
  workTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface ICreateExperience {
  workTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description?: string;
}

interface IUpdateExperience {
  id: string;
  workTitle?: string;
  companyName?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export type { IExperience, ICreateExperience, IUpdateExperience };
