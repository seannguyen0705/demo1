import { Controller } from '@nestjs/common';
import { ApplyJobService } from './apply-job.service';

@Controller('apply-job')
export class ApplyJobController {
  constructor(private readonly applyJobService: ApplyJobService) {}
}
