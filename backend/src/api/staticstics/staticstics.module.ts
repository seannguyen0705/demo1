import { Module } from '@nestjs/common';
import { StaticsticsService } from './staticstics.service';
import { StaticsticsController } from './staticstics.controller';
import { JobModule } from '../job/job.module';
import { CompanyModule } from '../company/company.module';
import { CandidateModule } from '../candidate/candidate.module';

@Module({
  imports: [JobModule, CompanyModule, CandidateModule],
  controllers: [StaticsticsController],
  providers: [StaticsticsService],
})
export class StaticsticsModule {}
