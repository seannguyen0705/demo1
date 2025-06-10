import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { Company } from './entities/company.entity';
import { QueryRunner } from 'typeorm';
import UpdateCompanyDto from './dtos/update-company.dto';
import { ILike } from 'typeorm';
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
        companyAddresses: {
          address: {
            province: true,
          },
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
    return this.companyRepository.count();
  }
}
