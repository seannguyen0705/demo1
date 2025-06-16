import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { CompanyModule } from '../company/company.module';
import { SkillModule } from '../skill/skill.module';
import { ApplyJobModule } from '../apply-job/apply-job.module';
import { AddressModule } from '../address/address.module';
import { CompanyAddressModule } from '../company-address/company-address.module';
import { EmailModule } from '../email/email.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    CompanyModule,
    SkillModule,
    ApplyJobModule,
    AddressModule,
    CompanyAddressModule,
    EmailModule,
  ],
  controllers: [JobController],
  providers: [JobService],
  exports: [JobService],
})
export class JobModule {}
