import { Injectable } from '@nestjs/common';
import { JobService } from '../job/job.service';
import { CompanyService } from '../company/company.service';
import { CandidateService } from '../candidate/candidate.service';

@Injectable()
export class StaticsticsService {
  constructor(
    private readonly jobService: JobService,
    private readonly companyService: CompanyService,
    private readonly candidateService: CandidateService,
  ) {}

  public async getStaticstics() {
    const [countJobs, countCompanies, countCandidates] = await Promise.all([
      this.jobService.countAllJobs(),
      this.companyService.countAllCompanies(),
      this.candidateService.countAllCandidates(),
    ]);

    return {
      countJobs,
      countCompanies,
      countCandidates,
    };
  }
}
