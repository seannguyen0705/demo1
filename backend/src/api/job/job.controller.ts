import { Param } from '@nestjs/common';
import { JobService } from './job.service';
import { InjectController, InjectRoute } from '@/decorators';
import jobRoutes from './job.routes';

@InjectController({ name: jobRoutes.index })
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @InjectRoute(jobRoutes.findByCompanyId)
  async findByCompanyId(@Param('companyId') companyId: string) {
    return this.jobService.findByCompanyId(companyId);
  }
}
