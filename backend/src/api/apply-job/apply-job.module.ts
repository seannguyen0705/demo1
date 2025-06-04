import { Module } from '@nestjs/common';
import { ApplyJobService } from './apply-job.service';
import { ApplyJobController } from './apply-job.controller';

@Module({
  controllers: [ApplyJobController],
  providers: [ApplyJobService],
})
export class ApplyJobModule {}
