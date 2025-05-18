import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { Company } from './entities/company.entity';
import { QueryRunner } from 'typeorm';
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: CompanyRepository,
  ) {}

  public async create(data: CreateCompanyDto, queryRunner: QueryRunner) {
    const existingCompany = await this.findByName(data.name);
    if (existingCompany) {
      throw new BadRequestException('Tên công ty đã tồn tại');
    }
    const company = queryRunner.manager.create(Company, data);
    return queryRunner.manager.save(Company, company);
  }

  public async findByName(name: string) {
    return this.companyRepository.findOneBy({ name });
  }
}
