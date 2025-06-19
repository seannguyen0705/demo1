import { Injectable } from '@nestjs/common';
import { JobService } from '../job/job.service';
import { CompanyService } from '../company/company.service';
import { CandidateService } from '../candidate/candidate.service';
import { ApplyJobService } from '../apply-job/apply-job.service';
@Injectable()
export class StaticsticsService {
  constructor(
    private readonly jobService: JobService,
    private readonly companyService: CompanyService,
    private readonly candidateService: CandidateService,
    private readonly applyJobService: ApplyJobService,
  ) {}

  public async getStaticstics() {
    const [countJobs, countCompanies, countCandidates, countApplyJobs] = await Promise.all([
      this.jobService.countAllJobs(),
      this.companyService.countAllCompanies(),
      this.candidateService.countAllCandidates(),
      this.applyJobService.countApplyJobs(),
    ]);

    return {
      countJobs,
      countCompanies,
      countCandidates,
      countApplyJobs,
    };
  }
}
