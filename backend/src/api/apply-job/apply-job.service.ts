import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ApplyJob } from './entities/apply-job.entity';
import { ApplyJobRepository } from './apply-job.repository';
import { CreateApplyJobDto } from './dto/create-apply-job.dto';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import { SaveJob } from '../save-job/entities/save-job.entity';
import { ApplyJobStatus, Order, OrderByApplyJob } from '@/common/enums';
import { QueryApplyJobDto } from './dto/query-apply-job.dto';

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
    const countNew = await this.applyJobRepository.count({
      where: { jobId, status: ApplyJobStatus.NEW },
    });
    const countProcessing = await this.applyJobRepository.count({
      where: { jobId, status: ApplyJobStatus.PROCESSING },
    });
    const countInterviewing = await this.applyJobRepository.count({
      where: { jobId, status: ApplyJobStatus.INTERVIEWING },
    });
    const countHired = await this.applyJobRepository.count({
      where: { jobId, status: ApplyJobStatus.HIRED },
    });
    const countRejected = await this.applyJobRepository.count({
      where: { jobId, status: ApplyJobStatus.REJECTED },
    });
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

  private async orderApplyJob(
    queryBuilder: SelectQueryBuilder<ApplyJob>,
    orderBy: OrderByApplyJob,
    order: Order = Order.ASC,
  ) {
    if (orderBy === OrderByApplyJob.CREATED_AT) {
      queryBuilder.orderBy('applyJob.createdAt', order);
    }
  }

  private async searchByStatus(queryBuilder: SelectQueryBuilder<ApplyJob>, status: ApplyJobStatus) {
    if (status) {
      queryBuilder.andWhere('applyJob.status =:status', { status });
    }
  }

  private async searchByKeyword(queryBuilder: SelectQueryBuilder<ApplyJob>, keyword: string) {
    if (keyword) {
      queryBuilder.andWhere(
        '(applyJob.fullName ILIKE :keyword OR applyJob.phoneNumber ILIKE :keyword OR candidate.email ILIKE :keyword)',
        {
          keyword: `%${keyword}%`,
        },
      );
    }
  }

  public async findAll(employerId: string, query: QueryApplyJobDto) {
    const { keyword, status, orderBy, order, page, limit } = query;

    const queryBuilder = this.applyJobRepository
      .createQueryBuilder('applyJob')
      .innerJoin('applyJob.job', 'job')
      .innerJoin('applyJob.candidate', 'candidate')
      .innerJoin('applyJob.file', 'file')
      .innerJoin('job.company', 'company', 'company.employerId = :employerId', { employerId })
      .skip(limit * (page - 1))
      .take(limit)
      .select([
        'applyJob.id',
        'applyJob.status',
        'applyJob.createdAt',
        'applyJob.fullName',
        'applyJob.phoneNumber',
        'applyJob.expectedAddress',
        'candidate.email',
        'applyJob.message',
        'job.id',
        'job.title',
        'candidate.id',
        'file.url',
      ]);
    await Promise.all([
      this.orderApplyJob(queryBuilder, orderBy, order),
      this.searchByStatus(queryBuilder, status),
      this.searchByKeyword(queryBuilder, keyword),
    ]);
    const [applyJobs, total] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(total / limit);
    if (page + 1 > numPage) {
      return { applyJobs, currentPage: page, nextPage: null, total };
    }
    return { applyJobs, currentPage: page, nextPage: page + 1, total };
  }
}
