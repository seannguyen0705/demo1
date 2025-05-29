import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CompanyImageRepository } from './company-image.repository';
import { CompanyImage } from './entities/companyImage.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { FileService } from '../file/file.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateFileDto } from '../file/dto/create-file.dto';
import { UpdateFileDto } from '../file/dto/update-file.dto';
import { File } from '../file/entities/file.entity';
@Injectable()
export class CompanyImageService {
  maxNumCompanyImage: number;
  private readonly folder: string;

  constructor(
    @InjectRepository(CompanyImage)
    private companyImageRepository: CompanyImageRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly companyService: CompanyService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly fileService: FileService,
  ) {
    this.maxNumCompanyImage = 10;
    this.folder = 'company/image';
  }

  async createCompanyImage(employerId: string, file: Express.Multer.File) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let uploadedFile: { url: string; key: string };
    try {
      const company = await this.companyService.findOneByEmployerId(employerId);
      const myCompanyImage = await this.getCompanyImage(company.id);
      if (myCompanyImage.length >= this.maxNumCompanyImage) {
        throw new BadRequestException('Đăng tải tối đa 10 ảnh');
      }
      uploadedFile = await this.cloudinaryService.uploadFile(file, this.folder);
      const data: CreateFileDto = {
        name: file.originalname,
        url: uploadedFile.url,
        key: uploadedFile.key,
        format: file.mimetype,
      };
      const newFile = await this.fileService.create(data, queryRunner);
      const companyImage = queryRunner.manager.create(CompanyImage, {
        fileId: newFile.id,
        companyId: company.id,
      });
      await queryRunner.manager.save(CompanyImage, companyImage);
      await queryRunner.commitTransaction();
      return companyImage;
    } catch (error) {
      if (uploadedFile) {
        await this.cloudinaryService.deleteFile(uploadedFile.key);
      }
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getCompanyImage(companyId: string) {
    return this.companyImageRepository.find({ where: { companyId }, order: { createdAt: 'ASC' } });
  }

  async deleteCompanyImage(id: string, employerId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const company = await this.companyService.findOneByEmployerId(employerId);
      const companyImage = await queryRunner.manager.findOneBy(CompanyImage, {
        id,
        companyId: company.id,
      });
      if (!companyImage) {
        throw new NotFoundException('Company image not found');
      }
      await queryRunner.manager.delete(CompanyImage, { id, companyId: company.id });
      await this.cloudinaryService.deleteFile(companyImage.file.key);
      await queryRunner.manager.delete(File, { id: companyImage.fileId });
      await queryRunner.commitTransaction();
      return { message: 'Company image deleted successfully' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateCompanyImage(id: string, employerId: string, file: Express.Multer.File) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let uploadedFile: { url: string; key: string };
    try {
      const company = await this.companyService.findOneByEmployerId(employerId);
      const companyImage = await queryRunner.manager.findOneBy(CompanyImage, {
        id,
        companyId: company.id,
      });
      if (!companyImage) {
        throw new NotFoundException('Company image not found');
      }
      uploadedFile = await this.cloudinaryService.uploadFile(file, this.folder);
      const data: UpdateFileDto = {
        name: file.originalname,
        url: uploadedFile.url,
        key: uploadedFile.key,
        format: file.mimetype,
      };
      const updatedCompanyImage = await this.fileService.update(companyImage.fileId, data, queryRunner);
      await this.cloudinaryService.deleteFile(companyImage.file.key);
      await queryRunner.commitTransaction();
      return updatedCompanyImage;
    } catch (error) {
      if (uploadedFile) {
        await this.cloudinaryService.deleteFile(uploadedFile.key);
      }
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
