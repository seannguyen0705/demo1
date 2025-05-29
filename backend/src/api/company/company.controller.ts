import { NotFoundException, Param, Body, UploadedFile } from '@nestjs/common';
import { CompanyService } from './company.service';
import { InjectController, InjectRoute, ReqUser } from '@/decorators';
import companyRoutes from './company.routes';
import UpdateCompanyDto from './dtos/update-company.dto';
import { IJwtStrategy } from '../auth/strategies';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateFileDto } from '../file/dto/create-file.dto';
import { FileService } from '../file/file.service';
import { ImageValidatorPipe } from '@/pipes';
@InjectController({
  name: companyRoutes.index,
  isCore: true,
})
export class CompanyController {
  private readonly folderLogo: string;
  private readonly folderBackground: string;
  constructor(
    private readonly companyService: CompanyService,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly cloudinaryService: CloudinaryService,
    private readonly fileService: FileService,
  ) {
    this.folderLogo = 'company/logo';
    this.folderBackground = 'company/background';
  }

  @InjectRoute(companyRoutes.findOneByName)
  async findOneByName(@Param('name') name: string) {
    const company = await this.companyService.findOneByName(name);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  @InjectRoute(companyRoutes.update)
  async update(@Body() data: UpdateCompanyDto, @ReqUser() user: IJwtStrategy) {
    const company = await this.companyService.findOneByEmployerId(user.element.id);
    const updateResult = await this.companyService.update(company.id, data);
    return updateResult;
  }

  @InjectRoute(companyRoutes.uploadLogo)
  async uploadLogo(
    @UploadedFile(new ImageValidatorPipe())
    file: Express.Multer.File,
    @ReqUser() user: IJwtStrategy,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let uploadedFile: { url: string; key: string };
    try {
      const company = await this.companyService.findOneByEmployerId(user.element.id);
      uploadedFile = await this.cloudinaryService.uploadFile(file, this.folderLogo);
      const createFile: CreateFileDto = {
        name: file.originalname,
        url: uploadedFile.url,
        key: uploadedFile.key,
        format: file.mimetype,
      };
      const createdFile = await this.fileService.create(createFile, queryRunner);
      await this.companyService.update(company.id, { logoId: createdFile.id }, queryRunner);
      if (company.logoId) {
        const oldLogo = await this.fileService.findOneById(company.logoId);
        await this.fileService.deleteById(oldLogo.id, queryRunner);
        await this.cloudinaryService.deleteFile(oldLogo.key);
      }
      await queryRunner.commitTransaction();
      return { message: 'Logo uploaded successfully' };
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

  @InjectRoute(companyRoutes.uploadBackground)
  async uploadBackground(
    @UploadedFile(new ImageValidatorPipe())
    file: Express.Multer.File,
    @ReqUser() user: IJwtStrategy,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let uploadedFile: { url: string; key: string };
    try {
      const company = await this.companyService.findOneByEmployerId(user.element.id);
      uploadedFile = await this.cloudinaryService.uploadFile(file, this.folderBackground);
      const createFile: CreateFileDto = {
        name: file.originalname,
        url: uploadedFile.url,
        key: uploadedFile.key,
        format: file.mimetype,
      };
      const createdFile = await this.fileService.create(createFile, queryRunner);
      await this.companyService.update(company.id, { backgroundId: createdFile.id }, queryRunner);
      if (company.backgroundId) {
        const oldBackground = await this.fileService.findOneById(company.backgroundId);
        await this.cloudinaryService.deleteFile(oldBackground.key);
        await this.fileService.deleteById(oldBackground.id, queryRunner);
      }
      await queryRunner.commitTransaction();
      return { message: 'Background uploaded successfully' };
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
