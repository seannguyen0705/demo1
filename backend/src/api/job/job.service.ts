import { Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobStatus } from '@/common/enums';

import { CompanyService } from '../company/company.service';
import { CreateDraftJobDto } from './dto/create-draft-job.dto';
import { DataSource } from 'typeorm';
import { JobSkill } from '../job-skill/entities/job-skill.entity';
import { CreatePublishedJobDto } from './dto/create-published-job.dto';
import { JobAlreadyExistsException } from './job.exception';
@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: JobRepository,
    private readonly companyService: CompanyService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

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
  async createDraftJob(employerId: string, data: CreateDraftJobDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const company = await this.companyService.findOneByEmployerId(employerId);
      const newJob = await queryRunner.manager.save(Job, { ...data, companyId: company.id, status: JobStatus.DRAFT });
      if (data.skillIds) {
        await Promise.all(
          data.skillIds.map((skillId) => queryRunner.manager.save(JobSkill, { jobId: newJob.id, skillId })),
        );
      }
      await queryRunner.commitTransaction();
      return newJob;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async findOneByTitleAndCompanyId(title: string, companyId: string) {
    return this.jobRepository.findOneBy({
      title,
      companyId,
    });
  }
  async createPublishedJob(employerId: string, data: CreatePublishedJobDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const company = await this.companyService.findOneByEmployerId(employerId);
      const existingJob = await this.findOneByTitleAndCompanyId(data.title, company.id);
      if (existingJob) {
        throw new JobAlreadyExistsException();
      }
      const newJob = await queryRunner.manager.save(Job, {
        ...data,
        companyId: company.id,
        status: JobStatus.PUBLISHED,
      });
      if (data.skillIds) {
        await Promise.all(
          data.skillIds.map((skillId) => queryRunner.manager.save(JobSkill, { jobId: newJob.id, skillId })),
        );
      }
      await queryRunner.commitTransaction();
      return newJob;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
