import { Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobLevel, JobStatus, JobType, SortJob } from '@/common/enums';

import { CompanyService } from '../company/company.service';
import { CreateDraftJobDto } from './dto/create-draft-job.dto';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import { JobSkill } from '../job-skill/entities/job-skill.entity';
import { CreatePublishedJobDto } from './dto/create-published-job.dto';
import { JobAlreadyExistsException } from './job.exception';
import { CreateJobAddressDto } from '../job-address/dto/create-job-address.dto';
import { Address } from '../address/entities/address.entity';
import { JobAddress } from '../job-address/entities/job-address.entity';
import { QueryJobDto } from './dto/query-job.dto';
import { SkillService } from '../skill/skill.service';
import { EmployerQueryJobDto } from './dto/employer-query-job.dto';
@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: JobRepository,
    private readonly companyService: CompanyService,
    private readonly skillService: SkillService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async findByCompanyId(companyId: string) {
    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .innerJoin('job.company', 'company')
      .leftJoin('company.logo', 'logo')
      .innerJoin('job.jobAddresses', 'jobAddresses')
      .innerJoin('jobAddresses.address', 'address')
      .innerJoin('address.province', 'province')
      .leftJoin('job.jobSkills', 'jobSkills')
      .leftJoin('jobSkills.skill', 'skill')
      .select([
        'job.id',
        'job.title',
        'job.jobExpertise',
        'job.createdAt',
        'job.salaryType',
        'company.name',
        'job.salaryMin',
        'job.salaryMax',
        'job.jobType',
        'job.jobLevel',
        'logo.url',
        'jobAddresses.id',
        'address.id',
        'province.name',
        'jobSkills.id',
        'skill.id',
        'skill.name',
      ])
      .andWhere('job.status =:status', { status: JobStatus.PUBLISHED });
    queryBuilder.andWhere('job.companyId =:companyId', { companyId }).orderBy('job.createdAt', 'DESC');

    return queryBuilder.getMany();
  }
  async createDraftJob(employerId: string, data: CreateDraftJobDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const company = await this.companyService.findOneByEmployerId(employerId);
      const existingJob = await this.findOneByTitleAndCompanyId(data.title, company.id);
      if (existingJob) {
        throw new JobAlreadyExistsException();
      }
      const newJob = await queryRunner.manager.save(Job, { ...data, companyId: company.id, status: JobStatus.DRAFT });
      if (data.skillIds) {
        await queryRunner.manager.insert(
          JobSkill,
          data.skillIds.map((skillId) => ({ jobId: newJob.id, skillId })),
        );
      }
      if (data.addresses) {
        const createJobAddresses: CreateJobAddressDto[] = await Promise.all(
          data.addresses.map(async (address) => {
            const createdAddress = await queryRunner.manager.save(Address, address);
            return {
              addressId: createdAddress.id,
              jobId: newJob.id,
            };
          }),
        );
        await queryRunner.manager.insert(JobAddress, createJobAddresses);
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

      await queryRunner.manager.insert(
        JobSkill,
        data.skillIds.map((skillId) => ({ jobId: newJob.id, skillId })),
      );

      // create address
      const createJobAddresses: CreateJobAddressDto[] = await Promise.all(
        data.addresses.map(async (address) => {
          const createdAddress = await queryRunner.manager.save(Address, address);
          return {
            addressId: createdAddress.id,
            jobId: newJob.id,
          };
        }),
      );
      // create job addresses
      await queryRunner.manager.insert(JobAddress, createJobAddresses);
      await queryRunner.commitTransaction();
      return newJob;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async searchJobByKeyword(queryBuilder: SelectQueryBuilder<Job>, keyword?: string) {
    if (keyword) {
      const company = await this.companyService.findOneByName(keyword);
      if (company) {
        queryBuilder.andWhere('company.name =:keyword', { keyword });
        return;
      }
      const skill = await this.skillService.findOneByName(keyword);
      if (skill) {
        queryBuilder.andWhere('skill.name ILIKE :keyword', { keyword });
        return;
      }
      queryBuilder.andWhere(
        '(job.title ILIKE :keyword OR job.description ILIKE :keyword OR job.requirement ILIKE :keyword OR job.benefit ILIKE :keyword)',
        {
          keyword: `%${keyword}%`,
        },
      );
    }
  }

  private async searchJobByProvinceName(queryBuilder: SelectQueryBuilder<Job>, provinceName?: string) {
    if (provinceName) {
      queryBuilder.andWhere('province.name =:provinceName', { provinceName });
    }
  }

  private async searchJobByJobType(queryBuilder: SelectQueryBuilder<Job>, jobType?: JobType) {
    if (jobType) {
      queryBuilder.andWhere('job.jobType =:jobType', { jobType });
    }
  }

  private async searchJobBySalary(queryBuilder: SelectQueryBuilder<Job>, minSalary?: number, maxSalary?: number) {
    if (minSalary && maxSalary) {
      queryBuilder.andWhere(
        '(job.salaryMin >=:minSalary AND job.salaryMin <=:maxSalary) OR (job.salaryMax >=:minSalary AND job.salaryMax <=:maxSalary)',
        { minSalary, maxSalary },
      );
    } else if (minSalary) {
      queryBuilder.andWhere('(job.salaryMin IS NULL OR job.salaryMin >=:minSalary)', { minSalary });
    } else if (maxSalary) {
      queryBuilder.andWhere('(job.salaryMax IS NULL OR job.salaryMax <=:maxSalary)', { maxSalary });
    }
  }

  private async searchJobByJobLevel(queryBuilder: SelectQueryBuilder<Job>, jobLevel?: JobLevel) {
    if (jobLevel) {
      queryBuilder.andWhere('job.jobLevel =:jobLevel', { jobLevel });
    }
  }

  private async searchJobByStatus(queryBuilder: SelectQueryBuilder<Job>, status?: JobStatus) {
    if (status) {
      queryBuilder.andWhere('job.status =:status', { status });
    }
  }

  private async orderJob(queryBuilder: SelectQueryBuilder<Job>, sort?: SortJob) {
    if (sort) {
      switch (sort) {
        case SortJob.NEWEST:
          queryBuilder.orderBy('job.createdAt', 'DESC');
          break;
        case SortJob.OLDEST:
          queryBuilder.orderBy('job.createdAt', 'ASC');
          break;
        case SortJob.SALARY_ASC:
          queryBuilder.orderBy('COALESCE((job.salaryMin + job.salaryMax)/2, job.salaryMin, job.salaryMax, 0)', 'ASC');
          break;
        case SortJob.SALARY_DESC:
          queryBuilder.orderBy('COALESCE((job.salaryMin + job.salaryMax)/2, job.salaryMin, job.salaryMax, 0)', 'DESC');
          break;
      }
    }
  }

  async findJobs(query: QueryJobDto) {
    const { keyword, provinceName, jobType, minSalary, maxSalary, sort, page, limit, jobLevel } = query;

    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .innerJoin('job.company', 'company')
      .leftJoin('company.logo', 'logo')
      .innerJoin('job.jobAddresses', 'jobAddresses')
      .innerJoin('jobAddresses.address', 'address')
      .innerJoin('address.province', 'province')
      .leftJoin('job.jobSkills', 'jobSkills')
      .leftJoin('jobSkills.skill', 'skill')

      .select([
        'job.id',
        'job.title',
        'job.jobExpertise',
        'job.createdAt',
        'job.salaryType',
        'company.name',
        'job.salaryMin',
        'job.salaryMax',
        'job.jobType',
        'job.jobLevel',
        'logo.url',
        'jobAddresses.id',
        'address.id',
        'province.name',
        'jobSkills.id',
        'skill.id',
        'skill.name',
      ])
      .andWhere('job.status =:status', { status: JobStatus.PUBLISHED });

    await this.searchJobByKeyword(queryBuilder, keyword);
    await this.searchJobByProvinceName(queryBuilder, provinceName);
    await this.searchJobByJobType(queryBuilder, jobType);
    await this.searchJobBySalary(queryBuilder, minSalary, maxSalary);
    await this.searchJobByJobLevel(queryBuilder, jobLevel);
    await this.orderJob(queryBuilder, sort);
    const [jobs, total] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(total / limit);
    if (page + 1 > numPage) {
      return { jobs, currentPage: page, nextPage: null, total };
    }
    return { jobs, currentPage: page, nextPage: page + 1, total };
  }

  public async employerFindJobs(employerId: string, query: EmployerQueryJobDto) {
    const { keyword, provinceName, jobType, minSalary, maxSalary, sort, page, limit, jobLevel, status } = query;
    const company = await this.companyService.findOneByEmployerId(employerId);

    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .innerJoin('job.company', 'company')
      .leftJoin('company.logo', 'logo')
      .leftJoin('job.jobAddresses', 'jobAddresses')
      .leftJoin('jobAddresses.address', 'address')
      .leftJoin('address.province', 'province')
      .leftJoin('job.jobSkills', 'jobSkills')
      .leftJoin('jobSkills.skill', 'skill')

      .select([
        'job.id',
        'job.title',
        'job.jobExpertise',
        'job.createdAt',
        'job.salaryType',
        'company.name',
        'job.salaryMin',
        'job.salaryMax',
        'job.jobType',
        'job.status',
        'job.jobLevel',
        'logo.url',
        'jobAddresses.id',
        'address.id',
        'address.detail',
        'province.name',
        'jobSkills.id',
        'skill.id',
        'skill.name',
      ])
      .andWhere('job.companyId =:companyId', { companyId: company.id });

    await this.searchJobByKeyword(queryBuilder, keyword);
    await this.searchJobByProvinceName(queryBuilder, provinceName);
    await this.searchJobByJobType(queryBuilder, jobType);
    await this.searchJobBySalary(queryBuilder, minSalary, maxSalary);
    await this.searchJobByJobLevel(queryBuilder, jobLevel);
    await this.searchJobByStatus(queryBuilder, status);
    await this.orderJob(queryBuilder, sort);
    const [jobs, total] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(total / limit);
    if (page + 1 > numPage) {
      return { jobs, currentPage: page, nextPage: null, total };
    }
    return { jobs, currentPage: page, nextPage: page + 1, total };
  }

  public async findOneById(id: string) {
    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .innerJoin('job.company', 'company')
      .leftJoin('company.logo', 'logo')
      .leftJoin('job.jobAddresses', 'jobAddresses')
      .leftJoin('jobAddresses.address', 'address')
      .leftJoin('address.province', 'province')
      .leftJoin('job.jobSkills', 'jobSkills')
      .leftJoin('jobSkills.skill', 'skill')
      .select([
        'job.id',
        'job.title',
        'company.name',
        'logo.url',
        'job.description',
        'jobSkills.id',
        'skill.name',
        'job.requirement',
        'job.benefit',
        'jobAddresses.id',
        'address.id',
        'province.name',
        'job.jobType',
        'job.createdAt',
        'job.salaryType',
        'job.salaryMin',
        'job.salaryMax',
        'job.jobLevel',
        'job.status',
      ])
      .andWhere('job.id =:id', { id });

    return queryBuilder.getOne();
  }

  public async countAllJobs() {
    return this.jobRepository.count({ where: { status: JobStatus.PUBLISHED } });
  }
}
