import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyJob } from './entities/apply-job.entity';
import { ApplyJobRepository } from './apply-job.repository';
import { CreateApplyJobDto } from './dto/create-apply-job.dto';
import { CvService } from '../cv/cv.service';

@Injectable()
export class ApplyJobService {
  constructor(
    @InjectRepository(ApplyJob) private readonly applyJobRepository: ApplyJobRepository,
    private readonly cvService: CvService,
  ) {}

  async create(data: CreateApplyJobDto) {
    const hasApplied = await this.applyJobRepository.findOne({
      where: { jobId: data.jobId, candidateId: data.candidateId },
    });
    if (hasApplied) {
      throw new BadRequestException('Bạn đã ứng tuyển vào vị trí này');
    }
    const applyJob = this.applyJobRepository.create(data);
    return this.applyJobRepository.save(applyJob);
  }
}
