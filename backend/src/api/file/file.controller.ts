import { NotFoundException, Param, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { InjectController, InjectRoute } from '@/decorators';
import fileRoutes from './file.routes';
import { FileValidatorPipe } from '@/pipes';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { File } from './entities/file.entity';

@InjectController({ name: fileRoutes.index })
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @InjectRoute(fileRoutes.upload)
  async uploadFile(
    @UploadedFile(
      new FileValidatorPipe({
        maxSizeConfig: {
          size: 1024 * 1024 * 5,
          errorMessage: 'File size must be less than 5MB',
        },
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Param('folder') folder: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { url, key } = await this.cloudinaryService.uploadFile(
        file,
        folder,
      );
      const newFile = await this.fileService.create(
        {
          name: file.originalname,
          url,
          key,
          format: file.mimetype,
        },
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return newFile;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @InjectRoute(fileRoutes.delete)
  async deleteFile(@Param('id') id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const file = await queryRunner.manager.findOneBy(File, { id });
      if (!file) {
        throw new NotFoundException('File not found');
      }
      await Promise.all([
        this.fileService.deleteById(id, queryRunner),
        this.cloudinaryService.deleteFile(file.key),
      ]);
      await queryRunner.commitTransaction();
      return { message: 'File deleted successfully' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
