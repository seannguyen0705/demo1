import { CompanyImageService } from './company-image.service';
import { InjectController, InjectRoute } from '@/decorators';
import companyImageRoutes from './company-image.routes';
import { FileValidatorPipe } from '@/pipes';
import { NotFoundException, Param, UploadedFile } from '@nestjs/common';
import { RequestWithUser } from '@/common/interfaces';
import { Req } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CloudinaryService } from '@/api/cloudinary/cloudinary.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateCompanyImageDto } from './dto/create-company-image.dto';
import { UpdateCompanyImageDto } from './dto/update-company-image.dto';
import { CompanyImage } from './entities/companyImage.entity';
import { CompanyService } from '@/api/company/company.service';

@InjectController({ name: companyImageRoutes.index, isCore: true })
export class CompanyImageController {
  private readonly folder: string;
  constructor(
    private readonly companyImageService: CompanyImageService,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly cloudinaryService: CloudinaryService,
    private readonly companyService: CompanyService,
  ) {
    this.folder = 'company-image';
  }

  @InjectRoute(companyImageRoutes.create)
  async createCompanyImage(
    @UploadedFile(
      new FileValidatorPipe({
        maxSizeConfig: {
          size: 1024 * 1024 * 5,
          errorMessage: 'File size must be less than 5MB',
        },
        fileTypeConfig: {
          type: /image\/*/,
          errorMessage: 'File type must be image',
        },
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let uploadedFile: { url: string; key: string };
    try {
      const company = await this.companyService.findOneByEmployerId(req.user.element.id);
      uploadedFile = await this.cloudinaryService.uploadFile(file, this.folder);
      const data: CreateCompanyImageDto = {
        name: file.originalname,
        url: uploadedFile.url,
        key: uploadedFile.key,
        format: file.mimetype,
        companyId: company.id,
      };
      const companyImage = await this.companyImageService.createCompanyImage(data, queryRunner);
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

  @InjectRoute(companyImageRoutes.update)
  async updateCompanyImage(
    @Param('id') id: string,
    @UploadedFile(
      new FileValidatorPipe({
        maxSizeConfig: {
          size: 1024 * 1024 * 5,
          errorMessage: 'File size must be less than 5MB',
        },
        fileTypeConfig: {
          type: /image\/*/,
          errorMessage: 'File type must be image',
        },
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Req() req: RequestWithUser,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let uploadedFile: { url: string; key: string };
    try {
      const company = await this.companyService.findOneByEmployerId(req.user.element.id);
      const companyImage = await queryRunner.manager.findOneBy(CompanyImage, {
        id,
        companyId: company.id,
      });
      if (!companyImage) {
        throw new NotFoundException('Company image not found');
      }
      uploadedFile = await this.cloudinaryService.uploadFile(file, this.folder);
      const data: UpdateCompanyImageDto = {
        name: file.originalname,
        url: uploadedFile.url,
        key: uploadedFile.key,
        format: file.mimetype,
      };
      const updatedCompanyImage = await this.companyImageService.updateCompanyImage(id, data, queryRunner);
      await this.cloudinaryService.deleteFile(companyImage.key);
      await queryRunner.commitTransaction();
      return updatedCompanyImage;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @InjectRoute(companyImageRoutes.delete)
  async deleteCompanyImage(@Param('id') id: string, @Req() req: RequestWithUser) {
    const company = await this.companyService.findOneByEmployerId(req.user.element.id);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const companyImage = await queryRunner.manager.findOneBy(CompanyImage, {
        id,
        companyId: company.id,
      });
      if (!companyImage) {
        throw new NotFoundException('Company image not found');
      }
      await this.companyImageService.deleteCompanyImage(id, company.id, queryRunner);
      await this.cloudinaryService.deleteFile(companyImage.key);
      await queryRunner.commitTransaction();
      return { message: 'Company image deleted successfully' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @InjectRoute(companyImageRoutes.getCompanyImage)
  async getCompanyImage(@Param('companyId') companyId: string) {
    const companyImage = await this.companyImageService.getCompanyImage(companyId);
    return companyImage;
  }
}
