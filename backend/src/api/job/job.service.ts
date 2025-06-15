import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { JobLevel, JobStatus, JobType, OrderByJob, Order, UserStatus } from '@/common/enums';

import { CompanyService } from '../company/company.service';
import { CreateDraftJobDto } from './dto/create-draft-job.dto';
import { LessThan, MoreThan, SelectQueryBuilder } from 'typeorm';
import { CreatePublishedJobDto } from './dto/create-published-job.dto';
import { JobAlreadyExistsException } from './job.exception';
import { QueryJobDto } from './dto/query-job.dto';
import { SkillService } from '../skill/skill.service';
import { EmployerQueryJobDto } from './dto/employer-query-job.dto';
import { QueryJobApplyDto } from './dto/query-job-apply.dto';
import { ApplyJobService } from '../apply-job/apply-job.service';
import { AddressService } from '../address/address.service';
import { UpdatePublishedJobDto } from './dto/update-published-job.dto';
import { CompanyAddressService } from '../company-address/company-address.service';
import { EmailService } from '../email/email.service';
@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: JobRepository,
    private readonly companyService: CompanyService,
    private readonly skillService: SkillService,
    private readonly applyJobService: ApplyJobService,
    private readonly addressService: AddressService,
    private readonly companyAddressService: CompanyAddressService,
    private readonly emailService: EmailService,
  ) {}

  async findByCompanyId(companyId: string) {
    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .innerJoin('job.company', 'company')
      .leftJoin('company.logo', 'logo')
      .innerJoin('job.addresses', 'addresses')
      .innerJoin('addresses.province', 'province')
      .leftJoin('job.skills', 'skills')
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
        'addresses.id',
        'province.name',
        'skills.id',
        'skills.name',
        'job.status',
      ])
      .andWhere('job.status =:status', { status: JobStatus.PUBLISHED })
      .andWhere('job.expiredAt >:now', { now: new Date() });
    queryBuilder.andWhere('job.companyId =:companyId', { companyId }).orderBy('job.createdAt', 'DESC');

    return queryBuilder.getMany();
  }
  async createDraftJob(employerId: string, data: CreateDraftJobDto) {
    const { addressIds, skillIds } = data;
    const company = await this.companyService.findOneByEmployerId(employerId);
    if (data.title) {
      const existingJob = await this.findOneByTitleAndCompanyId(data.title, company.id);
      if (existingJob) {
        throw new JobAlreadyExistsException();
      }
    }
    if (addressIds) {
      const addresses = await this.addressService.findByIds(addressIds);
      data.addresses = addresses;
    }
    if (skillIds) {
      const skills = await this.skillService.findByIds(skillIds);

      data.skills = skills;
    }
    const newJob = await this.jobRepository.save({ ...data, companyId: company.id, status: JobStatus.DRAFT });
    return newJob;
  }

  public async findOneByTitleAndCompanyId(title: string, companyId: string) {
    return this.jobRepository.findOneBy({
      title,
      companyId,
    });
  }
  async createPublishedJob(employerId: string, data: CreatePublishedJobDto) {
    const company = await this.companyService.findOneByEmployerId(employerId);
    const existingJob = await this.findOneByTitleAndCompanyId(data.title, company.id);
    if (existingJob) {
      throw new JobAlreadyExistsException();
    }
    const addresses = await this.addressService.findByIds(data.addressIds);
    const skills = await this.skillService.findByIds(data.skillIds);
    const newJob = await this.jobRepository.save({
      ...data,
      companyId: company.id,
      status: JobStatus.PUBLISHED,
      addresses,
      skills,
    });
    return newJob;
  }

  private async adminSearchJobByKeyword(queryBuilder: SelectQueryBuilder<Job>, keyword?: string) {
    if (keyword) {
      queryBuilder.andWhere('(job.title ILIKE :keyword OR company.name ILIKE :keyword)', {
        keyword: `%${keyword}%`,
      });
    }
  }

  private async searchJobByKeyword(queryBuilder: SelectQueryBuilder<Job>, keyword?: string) {
    if (keyword) {
      const company = await this.companyService.findOneByName(keyword);

      if (company) {
        queryBuilder.andWhere('company.name ILIKE :keyword', { keyword });
        return;
      }
      const skill = await this.skillService.findOneByName(keyword);
      if (skill) {
        queryBuilder.andWhere('skills.name ILIKE :keyword', { keyword });
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
        '((job.salaryMin >=:minSalary AND job.salaryMin <=:maxSalary) OR (job.salaryMax >=:minSalary AND job.salaryMax <=:maxSalary))',
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

  private async orderJob(queryBuilder: SelectQueryBuilder<Job>, orderBy?: OrderByJob, order?: Order) {
    if (!orderBy) {
      return;
    }
    if (orderBy === OrderByJob.SALARY) {
      queryBuilder.orderBy(`job.salaryMin`, order, 'NULLS LAST');
    } else {
      queryBuilder.orderBy(`job.${orderBy}`, order, 'NULLS LAST');
    }
  }

  async findJobs(query: QueryJobDto) {
    const { keyword, provinceName, jobType, minSalary, maxSalary, orderBy, order, page, limit, jobLevel } = query;

    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .innerJoin('job.company', 'company')
      .leftJoin('company.logo', 'logo')
      .innerJoin('job.addresses', 'addresses')
      .innerJoin('addresses.province', 'province')
      .innerJoin('company.employer', 'employer')
      .leftJoin('job.skills', 'skills')
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
        'addresses.id',
        'province.name',
        'skills.id',
        'skills.name',
        'employer.status',
      ])
      .andWhere('job.status =:status', { status: JobStatus.PUBLISHED })
      .andWhere('job.expiredAt >:now', { now: new Date() })
      .andWhere('employer.status =:userStatus', { userStatus: UserStatus.ACTIVE });

    await Promise.all([
      this.searchJobByKeyword(queryBuilder, keyword),
      this.searchJobByProvinceName(queryBuilder, provinceName),
      this.searchJobByJobType(queryBuilder, jobType),
      this.searchJobBySalary(queryBuilder, minSalary, maxSalary),
      this.searchJobByJobLevel(queryBuilder, jobLevel),
      this.orderJob(queryBuilder, orderBy, order),
    ]);

    queryBuilder.skip(limit * (page - 1)).take(limit);

    const [jobs, total] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(total / limit);
    if (page + 1 > numPage) {
      return { jobs, currentPage: page, nextPage: null, total };
    }
    return { jobs, currentPage: page, nextPage: page + 1, total };
  }

  public async employerFindJobs(employerId: string, query: EmployerQueryJobDto) {
    const { keyword, provinceName, jobType, minSalary, maxSalary, orderBy, order, page, limit, jobLevel, status } =
      query;
    const company = await this.companyService.findOneByEmployerId(employerId);

    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .innerJoin('job.company', 'company')
      .leftJoin('company.logo', 'logo')
      .leftJoin('job.addresses', 'addresses')
      .leftJoin('addresses.province', 'province')
      .leftJoin('job.skills', 'skills')
      .skip(limit * (page - 1))
      .take(limit)

      .select([
        'job.id',
        'job.title',
        'job.jobExpertise',
        'job.createdAt',
        'job.salaryType',
        'company.name',
        'job.salaryMin',
        'job.expiredAt',
        'job.salaryMax',
        'job.jobType',
        'job.status',
        'job.jobLevel',
        'logo.url',
        'addresses.id',
        'addresses.id',
        'addresses.detail',
        'province.name',
        'skills.id',
        'skills.id',
        'skills.name',
      ])
      .andWhere('job.companyId =:companyId', { companyId: company.id });

    await Promise.all([
      this.searchJobByKeyword(queryBuilder, keyword),
      this.searchJobByProvinceName(queryBuilder, provinceName),
      this.searchJobByJobType(queryBuilder, jobType),
      this.searchJobBySalary(queryBuilder, minSalary, maxSalary),
      this.searchJobByJobLevel(queryBuilder, jobLevel),
      this.searchJobByStatus(queryBuilder, status),
      this.orderJob(queryBuilder, orderBy, order),
    ]);
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
      .leftJoin('job.addresses', 'addresses')
      .leftJoin('addresses.province', 'province')
      .leftJoin('job.skills', 'skills')
      .select([
        'job.id',
        'job.title',
        'job.expiredAt',
        'company.name',
        'company.id',
        'logo.url',
        'job.description',
        'skills.id',
        'skills.name',
        'job.requirement',
        'job.benefit',
        'addresses.id',
        'addresses.detail',
        'province.name',
        'job.jobType',
        'job.createdAt',
        'job.salaryType',
        'job.salaryMin',
        'job.jobExpertise',
        'job.jobDomain',
        'job.salaryMax',
        'job.jobLevel',
        'job.status',
      ])
      .andWhere('job.id =:id', { id });

    const job = await queryBuilder.getOne();
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  public async countAllJobs() {
    return this.jobRepository.count({
      where: {
        status: JobStatus.PUBLISHED,
        company: {
          employer: {
            status: UserStatus.ACTIVE,
          },
        },
      },
    });
  }

  public async candidateGetJobById(id: string, candidateId: string) {
    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .innerJoin('job.company', 'company')
      .leftJoin('company.logo', 'logo')
      .leftJoin('job.addresses', 'addresses')
      .leftJoin('addresses.province', 'province')
      .leftJoin('job.skills', 'skills')
      .leftJoin('job.applyJobs', 'applyJobs', 'applyJobs.candidateId =:candidateId', { candidateId })
      .leftJoin('job.saveJobs', 'saveJobs', 'saveJobs.candidateId =:candidateId', { candidateId })
      .select([
        'job.id',
        'job.title',
        'job.expiredAt',
        'company.name',
        'company.id',
        'logo.url',
        'job.description',
        'skills.id',
        'skills.name',
        'job.requirement',
        'job.benefit',
        'addresses.id',
        'addresses.detail',
        'province.name',
        'job.jobType',
        'job.createdAt',
        'job.salaryType',
        'job.salaryMin',
        'job.jobExpertise',
        'job.jobDomain',
        'job.salaryMax',
        'job.jobLevel',
        'job.status',
        'applyJobs.id',
        'applyJobs.createdAt',
        'saveJobs.id',
      ])
      .andWhere('job.id =:id', { id })
      .andWhere('job.status !=:status', { status: JobStatus.DRAFT });

    this.increaseViewCount(id);

    return queryBuilder.getOne();
  }

  public async candidateGetJobApply(candidateId: string, query: QueryJobApplyDto) {
    const { page, limit, orderBy, order } = query;
    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .innerJoin('job.company', 'company')
      .leftJoin('company.logo', 'logo')
      .leftJoin('job.addresses', 'addresses')
      .leftJoin('addresses.province', 'province')
      .innerJoin('job.applyJobs', 'applyJobs', 'applyJobs.candidateId =:candidateId', { candidateId })
      .skip(limit * (page - 1))
      .take(limit)
      .select([
        'job.id',
        'job.title',
        'company.name',
        'company.id',
        'logo.url',
        'addresses.id',
        'addresses.detail',
        'province.name',
        'job.jobType',
        'job.createdAt',
        'job.salaryType',
        'job.salaryMin',
        'job.salaryMax',
        'job.jobLevel',
        'job.expiredAt',
        'job.status',
        'applyJobs.id',
        'applyJobs.createdAt',
      ])
      .andWhere('job.status !=:status', { status: JobStatus.DRAFT });
    await this.orderJob(queryBuilder, orderBy, order);

    const [jobs, total] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(total / limit);
    if (page + 1 > numPage) {
      return { jobs, currentPage: page, nextPage: null, total };
    }
    return { jobs, currentPage: page, nextPage: page + 1, total };
  }

  public async candidateGetJobSaved(candidateId: string, query: QueryJobApplyDto) {
    const { page, limit, orderBy, order } = query;
    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .innerJoin('job.company', 'company')
      .leftJoin('company.logo', 'logo')
      .leftJoin('job.addresses', 'addresses')
      .leftJoin('addresses.province', 'province')
      .innerJoin('job.saveJobs', 'saveJobs', 'saveJobs.candidateId =:candidateId', { candidateId })
      .skip(limit * (page - 1))
      .take(limit)
      .select([
        'job.id',
        'job.title',
        'company.name',
        'company.id',
        'logo.url',
        'addresses.id',
        'addresses.detail',
        'province.name',
        'job.jobType',
        'job.createdAt',
        'job.expiredAt',
        'job.status',
        'job.salaryType',
        'job.salaryMin',
        'job.salaryMax',
        'job.jobLevel',
        'saveJobs.id',
      ])
      .andWhere('job.status !=:status', { status: JobStatus.DRAFT });
    await this.orderJob(queryBuilder, orderBy, order);

    const [jobs, total] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(total / limit);
    if (page + 1 > numPage) {
      return { jobs, currentPage: page, nextPage: null, total };
    }
    return { jobs, currentPage: page, nextPage: page + 1, total };
  }

  public async getStaticsticsByJobId(jobId: string, employerId: string) {
    const company = await this.companyService.findOneByEmployerId(employerId);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const job = await this.jobRepository.findOneBy({ id: jobId, companyId: company.id });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    const statistics = await this.applyJobService.staticsticsByJobId(jobId);
    return {
      ...statistics,
      viewCount: job.viewCount,
    };
  }

  public async increaseViewCount(jobId: string) {
    const job = await this.jobRepository.findOneBy({ id: jobId });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    job.viewCount++;
    await this.jobRepository.save(job);
  }

  public async deleteByIdAndEmployerId(jobId: string, employerId: string) {
    const company = await this.companyService.findOneByEmployerId(employerId);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const job = await this.jobRepository.findOneBy({ id: jobId, companyId: company.id });
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return this.jobRepository.delete(jobId);
  }

  public async deleteById(jobId: string) {
    const job = await this.jobRepository.findOneBy({ id: jobId });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return this.jobRepository.delete(jobId);
  }

  public async updatePublishedJob(jobId: string, employerId: string, data: UpdatePublishedJobDto) {
    const { addressIds, skillIds } = data;
    const company = await this.companyService.findOneByEmployerId(employerId);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const job = await this.jobRepository.findOneBy({ id: jobId, companyId: company.id });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    if (addressIds) {
      job.addresses = await this.companyAddressService.getAddressByCompanyIdAndAddressIds(company.id, addressIds);
    }
    if (skillIds) {
      job.skills = await this.skillService.findByIds(skillIds);
    }
    return this.jobRepository.save({ ...job, ...data, status: JobStatus.PUBLISHED });
  }

  public async updateStatus(jobId: string, employerId: string, status: JobStatus) {
    if (status === JobStatus.DRAFT) {
      throw new BadRequestException('Cannot update job status to draft');
    }
    const company = await this.companyService.findOneByEmployerId(employerId);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const job = await this.jobRepository.findOneBy({ id: jobId, companyId: company.id });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    job.status = status;
    return this.jobRepository.save(job);
  }

  public async adminFindJobs(query: QueryJobDto) {
    const { page, limit, keyword, order, orderBy } = query;

    const queryBuilder = this.jobRepository
      .createQueryBuilder('job')
      .skip(limit * (page - 1))
      .take(limit)
      .innerJoin('job.company', 'company')
      .innerJoin('company.employer', 'employer')
      .loadRelationCountAndMap('job.applyJobCount', 'job.applyJobs', 'applyJobs')
      .select(['job.id', 'job.title', 'job.createdAt', 'job.expiredAt', 'company.name'])
      .andWhere('job.status =:status', { status: JobStatus.PUBLISHED })
      .andWhere('employer.status =:userStatus', { userStatus: UserStatus.ACTIVE });

    await Promise.all([
      this.adminSearchJobByKeyword(queryBuilder, keyword),
      this.orderJob(queryBuilder, orderBy, order),
    ]);

    const [jobs, total] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(total / limit);
    if (page + 1 > numPage) {
      return { jobs, currentPage: page, nextPage: null, total };
    }
    return { jobs, currentPage: page, nextPage: page + 1, total };
  }

  public async adminDeleteJob(jobId: string, reason: string) {
    const job = await this.jobRepository.findOne({
      where: { id: jobId },
      relations: {
        company: {
          employer: true,
        },
      },
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    await this.jobRepository.delete(jobId);
    await this.emailService.deleteJob(job.company.employer.email, job.company.employer.fullName, job.title, reason);
    return job;
  }

  public async countJobIn6MonthsAgo() {
    const result: { date: Date; count: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - i);
      const count = await this.jobRepository.count({
        where: {
          createdAt: LessThan(sixMonthsAgo),
          status: JobStatus.PUBLISHED,
        },
      });
      result.push({ date: sixMonthsAgo, count });
    }
    return result;
  }
}
