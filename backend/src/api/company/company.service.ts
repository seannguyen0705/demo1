import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { Company } from './entities/company.entity';
import { QueryRunner } from 'typeorm';
import UpdateCompanyDto from './dtos/update-company.dto';
import { ILike } from 'typeorm';
import { JobStatus, UserStatus } from '@/common/enums';
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: CompanyRepository,
  ) {}

  public async create(data: CreateCompanyDto, queryRunner: QueryRunner) {
    const existingCompany = await this.findOneByName(data.name);
    if (existingCompany) {
      throw new BadRequestException('Tên công ty đã tồn tại');
    }
    const company = queryRunner.manager.create(Company, data);
    return queryRunner.manager.save(Company, company);
  }

  public async findOneByName(name: string) {
    return this.companyRepository.findOne({
      where: { name: ILike(name) },
      relations: {
        logo: true,
        background: true,
        addresses: {
          province: true,
        },
      },
    });
  }

  public async findOneById(id: string) {
    return this.companyRepository.findOneBy({ id });
  }

  public async update(id: string, data: UpdateCompanyDto, queryRunner?: QueryRunner) {
    if (queryRunner) {
      return queryRunner.manager.update(Company, id, data);
    }
    return this.companyRepository.update(id, data);
  }

  public async findOneByEmployerId(employerId: string) {
    const company = await this.companyRepository.findOneBy({ employerId });
    if (!company) {
      throw new NotFoundException('Không tìm thấy công ty');
    }
    return company;
  }

  public async findOneByIdAndEmployerId(id: string, employerId: string) {
    const company = await this.companyRepository.findOneBy({ id, employerId });
    if (!company) {
      throw new NotFoundException('Không tìm thấy công ty');
    }
    return company;
  }

  public async countAllCompanies() {
    return this.companyRepository.count({
      where: {
        employer: {
          status: UserStatus.ACTIVE,
        },
      },
    });
  }

  public async getTop10Companies() {
    const queryBuilder = this.companyRepository
      .createQueryBuilder('company')
      .leftJoin('company.reviews', 'reviews')
      .leftJoin('company.logo', 'logo')
      .leftJoin('company.jobs', 'jobs')
      .leftJoin('company.addresses', 'addresses')
      .leftJoin('addresses.province', 'province')
      .loadRelationCountAndMap('company.jobCount', 'company.jobs', 'jobs', (qb) =>
        qb.where('jobs.status = :status', { status: JobStatus.PUBLISHED }),
      )
      .select(['company.id', 'company.name', 'logo.url', 'addresses.id', 'province.name'])
      .addSelect('AVG(reviews.rating)', 'avg_rating')
      .addSelect('COUNT(reviews.id)', 'review_count')
      .orderBy('avg_rating', 'DESC', 'NULLS LAST')

      .groupBy('company.id')
      .addGroupBy('logo.id')
      .addGroupBy('addresses.id')
      .addGroupBy('province.id')
      .take(10);
    const companies = await queryBuilder.getMany();
    return companies;
  }
}
