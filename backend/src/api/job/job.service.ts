import { Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobStatus } from '@/common/enums';
@Injectable()
export class JobService {
  constructor(@InjectRepository(Job) private readonly jobRepository: JobRepository) {}

  async findByCompanyId(companyId: string) {
    return this.jobRepository.find({
      where: {
        companyId,
        status: JobStatus.PUBLISHED,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
