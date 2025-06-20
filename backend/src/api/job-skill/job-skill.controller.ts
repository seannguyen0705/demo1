import { Controller } from '@nestjs/common';
import { JobSkillService } from './job-skill.service';

@Controller('job-skill')
export class JobSkillController {
  constructor(private readonly jobSkillService: JobSkillService) {}
}
