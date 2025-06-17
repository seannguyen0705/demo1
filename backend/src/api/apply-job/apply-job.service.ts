import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ApplyJob } from './entities/apply-job.entity';
import { ApplyJobRepository } from './apply-job.repository';
import { CreateApplyJobDto } from './dto/create-apply-job.dto';
import { DataSource, LessThan, SelectQueryBuilder } from 'typeorm';
import { SaveJob } from '../save-job/entities/save-job.entity';
import { ApplyJobStatus, ApplyJobStatusQuery, JobStatus, Order, OrderByApplyJob } from '@/common/enums';
import { QueryApplyJobDto } from './dto/query-apply-job.dto';
import { UpdateApplyJobStatusDto } from './dto/update-apply-job-status.dto';
import { Job } from '../job/entities/job.entity';
import mapQueryStatusToStatusDb from '@/utils/helpers/mapQueryStatusToStatusDb';

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
      const job = await queryRunner.manager.findOne(Job, {
        where: { id: data.jobId },
      });
      if (job.expiredAt < new Date()) {
        throw new BadRequestException('Hạn nộp đã hết');
      }
      if (job.status !== JobStatus.PUBLISHED) {
        throw new BadRequestException('Hiện tại không tuyển cho công việc này');
      }
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
    const [countNew, countSeen, countInterviewing, countHired, countRejected] = await Promise.all([
      this.applyJobRepository.count({
        where: { jobId, status: ApplyJobStatus.NEW },
      }),
      this.applyJobRepository.count({
        where: { jobId, status: ApplyJobStatus.SEEN },
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
    const countTotal = countNew + countSeen + countInterviewing + countHired + countRejected;
    return {
      countNew,
      countSeen,
      countInterviewing,
      countHired,
      countRejected,
      countTotal,
    };
  }

  private async orderApplyJob(
    queryBuilder: SelectQueryBuilder<ApplyJob>,
    orderBy: OrderByApplyJob,
    order: Order = Order.DESC,
  ) {
    if (orderBy === OrderByApplyJob.CREATED_AT) {
      queryBuilder.addOrderBy('applyJob.createdAt', order);
    }
    if (orderBy === OrderByApplyJob.STATUS) {
      queryBuilder.addOrderBy('applyJob.status', order);
    }
  }

  private async searchByStatus(queryBuilder: SelectQueryBuilder<ApplyJob>, status: ApplyJobStatusQuery) {
    if (status) {
      queryBuilder.andWhere('applyJob.status =:status', { status: mapQueryStatusToStatusDb(status) });
    }
  }

  private async searchByKeyword(queryBuilder: SelectQueryBuilder<ApplyJob>, keyword: string) {
    if (keyword) {
      queryBuilder.andWhere(
        '(applyJob.fullName ILIKE :keyword OR applyJob.phoneNumber ILIKE :keyword OR candidate.email ILIKE :keyword OR job.title ILIKE :keyword)',
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
      .innerJoin('job.company', 'company', 'company.employerId = :employerId', { employerId })
      .skip(limit * (page - 1))
      .take(limit)
      .select([
        'applyJob.id',
        'applyJob.status',
        'applyJob.createdAt',
        'applyJob.fullName',
        'applyJob.phoneNumber',
        'applyJob.candidateId',
        'candidate.email',
        'job.id',
        'job.title',
        'candidate.id',
      ]);
    await Promise.all([
      this.orderApplyJob(queryBuilder, orderBy, order),
      this.searchByStatus(queryBuilder, status),
      this.searchByKeyword(queryBuilder, keyword),
    ]);
    const [applyJobs, total] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(total / limit);
    const applyJobsResponse = applyJobs.map((applyJob) => applyJob.toResponse());
    if (page + 1 > numPage) {
      return { applyJobs: applyJobsResponse, currentPage: page, nextPage: null, total };
    }
    return { applyJobs: applyJobsResponse, currentPage: page, nextPage: page + 1, total };
  }

  public async getApplyJobById(id: string, employerId: string) {
    const queryBuilder = this.applyJobRepository
      .createQueryBuilder('applyJob')
      .innerJoin('applyJob.job', 'job')
      .innerJoin('applyJob.file', 'file')
      .innerJoin('applyJob.candidate', 'candidate')
      .innerJoin('job.company', 'company', 'company.employerId = :employerId', { employerId })
      .select([
        'applyJob.id',
        'applyJob.status',
        'applyJob.createdAt',
        'applyJob.fullName',
        'applyJob.phoneNumber',
        'applyJob.expectedAddress',
        'applyJob.message',
        'file.url',
        'file.createdAt',
        'file.name',
        'candidate.email',
        'job.id',
        'job.title',
        'candidate.id',
      ])
      .where('applyJob.id = :id', { id });
    const applyJob = await queryBuilder.getOne();
    if (!applyJob) {
      throw new NotFoundException('Không tìm thấy đơn ứng tuyển');
    }

    return applyJob.toResponse();
  }

  public async updateStatus(id: string, employerId: string, data: UpdateApplyJobStatusDto) {
    const { status } = data;

    const queryBuilder = this.applyJobRepository
      .createQueryBuilder('applyJob')
      .innerJoin('applyJob.job', 'job')
      .innerJoin('job.company', 'company', 'company.employerId = :employerId', { employerId })
      .where('applyJob.id = :id', { id });
    const applyJob = await queryBuilder.getOne();
    if (!applyJob) {
      throw new NotFoundException('Không tìm thấy ứng viên');
    }

    if (applyJob.status === ApplyJobStatus.NEW || applyJob.status === ApplyJobStatus.SEEN) {
      // allow set to SEEN OR REJECTED OR INTERVIEWING
      if (
        status === ApplyJobStatus.SEEN ||
        status === ApplyJobStatus.REJECTED ||
        status === ApplyJobStatus.INTERVIEWING
      ) {
        return await this.applyJobRepository.update(id, { status });
      }
    } else if (applyJob.status === ApplyJobStatus.INTERVIEWING) {
      // allow set to HIRED OR REJECTED
      if (status === ApplyJobStatus.HIRED || status === ApplyJobStatus.REJECTED) {
        return await this.applyJobRepository.update(id, { status });
      }
    }
    throw new BadRequestException('Không thể cập nhật trạng thái');
  }

  public async countApplyJobIn6MonthsAgo() {
    const result = await Promise.all(
      Array.from({ length: 6 }).map(async (_, i) => {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - i);
        const count = await this.applyJobRepository.count({
          where: {
            createdAt: LessThan(sixMonthsAgo),
          },
        });
        return { date: sixMonthsAgo, count };
      }),
    );
    return result;
  }
}
