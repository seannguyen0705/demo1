interface ISaveJob {
  id: string;
  jobId: string;
  candidateId: string;
}

interface ICreateSaveJob {
  jobId: string;
}

export type { ISaveJob, ICreateSaveJob };
