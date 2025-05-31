import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { CompanyModule } from '../company/company.module';
@Module({
  imports: [TypeOrmModule.forFeature([Job]), CompanyModule],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
