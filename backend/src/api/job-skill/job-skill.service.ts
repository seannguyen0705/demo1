import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobSkill } from './entities/job-skill.entity';
import { JobSkillRepository } from './job-skill.repository';
import { CreateJobSkillDto } from './dto/create-job-skill.dto';
@Injectable()
export class JobSkillService {
  constructor(@InjectRepository(JobSkill) private readonly jobSkillRepository: JobSkillRepository) {}

  async createJobSkill(data: CreateJobSkillDto) {
    return this.jobSkillRepository.save(data);
  }
}
