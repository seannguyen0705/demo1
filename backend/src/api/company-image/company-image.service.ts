import { BadRequestException, Injectable } from '@nestjs/common';
import { CompanyImageRepository } from './company-image.repository';
import { CompanyImage } from './entities/companyImage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyImageDto } from './dto/create-company-image.dto';
import { QueryRunner } from 'typeorm';
import { UpdateCompanyImageDto } from './dto/update-company-image.dto';

@Injectable()
export class CompanyImageService {
  maxNumCompanyImage: number;
  constructor(
    @InjectRepository(CompanyImage)
    private companyImageRepository: CompanyImageRepository,
  ) {
    this.maxNumCompanyImage = 10;
  }

  async createCompanyImage(data: CreateCompanyImageDto, queryRunner: QueryRunner) {
    const myCompanyImage = await this.getCompanyImage(data.companyId);
    if (myCompanyImage.length >= this.maxNumCompanyImage) {
      throw new BadRequestException('Đăng tải tối đa 10 ảnh');
    }
    const companyImage = queryRunner.manager.create(CompanyImage, data);
    return queryRunner.manager.save(CompanyImage, companyImage);
  }

  async getCompanyImage(companyId: string) {
    return this.companyImageRepository.find({ where: { companyId }, order: { createdAt: 'ASC' } });
  }

  async deleteCompanyImage(id: string, companyId: string, queryRunner: QueryRunner) {
    return queryRunner.manager.delete(CompanyImage, { id, companyId });
  }
  public async updateCompanyImage(id: string, data: UpdateCompanyImageDto, queryRunner: QueryRunner) {
    return queryRunner.manager.update(CompanyImage, id, data);
  }
}
