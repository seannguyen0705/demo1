import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ApplyJob } from './entities/apply-job.entity';
import { ApplyJobRepository } from './apply-job.repository';
import { CreateApplyJobDto } from './dto/create-apply-job.dto';
import { DataSource } from 'typeorm';
import { SaveJob } from '../save-job/entities/save-job.entity';
import { ApplyJobStatus } from '@/common/enums';

@Injectable()
export class ApplyJobService {
  constructor(
    @InjectRepository(ApplyJob) private readonly applyJobRepository: ApplyJobRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(data: CreateApplyJobDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const hasApplied = await queryRunner.manager.findOne(ApplyJob, {
        where: { jobId: data.jobId, candidateId: data.candidateId },
      });
      if (hasApplied) {
        throw new BadRequestException('Bạn đã ứng tuyển vào vị trí này');
      }
      await queryRunner.manager.save(ApplyJob, data);
      const saveJob = await queryRunner.manager.findOne(SaveJob, {
        where: { jobId: data.jobId, candidateId: data.candidateId },
      });
      if (saveJob) {
        await queryRunner.manager.delete(SaveJob, saveJob.id);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async staticsticsByJobId(jobId: string) {
    const [countNew, countProcessing, countInterviewing, countHired, countRejected] = await Promise.all([
      this.applyJobRepository.count({
        where: { jobId, status: ApplyJobStatus.NEW },
      }),
      this.applyJobRepository.count({
        where: { jobId, status: ApplyJobStatus.PROCESSING },
      }),
      this.applyJobRepository.count({
        where: { jobId, status: ApplyJobStatus.INTERVIEWING },
      }),
      this.applyJobRepository.count({
        where: { jobId, status: ApplyJobStatus.HIRED },
      }),
      this.applyJobRepository.count({
        where: { jobId, status: ApplyJobStatus.REJECTED },
      }),
    ]);
    const countTotal = countNew + countProcessing + countInterviewing + countHired + countRejected;
    return {
      countNew,
      countProcessing,
      countInterviewing,
      countHired,
      countRejected,
      countTotal,
    };
  }
}
