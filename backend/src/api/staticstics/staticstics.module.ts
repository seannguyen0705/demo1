import { Module } from '@nestjs/common';
import { StaticsticsService } from './staticstics.service';
import { StaticsticsController } from './staticstics.controller';
import { JobModule } from '../job/job.module';
import { CompanyModule } from '../company/company.module';
import { CandidateModule } from '../candidate/candidate.module';
import { ApplyJobModule } from '../apply-job/apply-job.module';
import { EmployerModule } from '../employer/employer.module';
@Module({
  imports: [JobModule, CompanyModule, CandidateModule, ApplyJobModule, EmployerModule],
  controllers: [StaticsticsController],
  providers: [StaticsticsService],
})
export class StaticsticsModule {}
