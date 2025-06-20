import { StaticsticsService } from './staticstics.service';
import { InjectController, InjectRoute } from '@/decorators';
import staticsticsRoutes from './staticstics.routes';
import { JobService } from '../job/job.service';
import { EmployerService } from '../employer/employer.service';
import { CandidateService } from '../candidate/candidate.service';
import { ApplyJobService } from '../apply-job/apply-job.service';
@InjectController({ name: staticsticsRoutes.index })
export class StaticsticsController {
  constructor(
    private readonly staticsticsService: StaticsticsService,
    private readonly jobService: JobService,
    private readonly employerService: EmployerService,
    private readonly candidateService: CandidateService,
    private readonly applyJobService: ApplyJobService,
  ) {}

  @InjectRoute(staticsticsRoutes.getStaticstics)
  public async getStaticstics() {
    return this.staticsticsService.getStaticstics();
  }

  @InjectRoute(staticsticsRoutes.staticsticsCountIn6MonthsAgo)
  public async staticsticsCountIn6MonthsAgo() {
    const [jobs, employers, candidates, applyJobs] = await Promise.all([
      this.jobService.countJobIn6MonthsAgo(),
      this.employerService.countEmployerIn6MonthsAgo(),
      this.candidateService.countCandidateIn6MonthsAgo(),
      this.applyJobService.countApplyJobIn6MonthsAgo(),
    ]);
    return { jobs, employers, candidates, applyJobs };
  }
}
