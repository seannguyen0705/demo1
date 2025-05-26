import { CvService } from './cv.service';
import { InjectController, InjectRoute } from '@/decorators';
import CvRoutes from './cv.routes';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import cvRoutes from './cv.routes';
import { NotFoundException, Param, Req, UploadedFile } from '@nestjs/common';
import { FileValidatorPipe } from '@/pipes';
import { RequestWithUser } from '@/common/interfaces';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
@InjectController({ name: CvRoutes.index })
export class CvController {
  private readonly folder: string;
  constructor(
    private readonly cvService: CvService,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly cloudinaryService: CloudinaryService,
  ) {
    this.folder = 'cv';
  }

  @InjectRoute(cvRoutes.create)
  async createCv(
    @UploadedFile(
      new FileValidatorPipe({
        maxSizeConfig: {
          size: 1024 * 1024 * 5,
          errorMessage: 'File size must be less than 5MB',
        },
        fileTypeConfig: {
          type: /application\/pdf|application\/msword/,
          errorMessage: 'File type must be pdf or doc',
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
      uploadedFile = await this.cloudinaryService.uploadFile(file, this.folder);
      const data: CreateCvDto = {
        name: file.originalname,
        url: uploadedFile.url,
        key: uploadedFile.key,
        format: file.mimetype,
        candidateId: req.user.element.id,
      };
      const cv = await this.cvService.createCv(data, queryRunner);
      await queryRunner.commitTransaction();
      return cv;
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

  @InjectRoute(cvRoutes.update)
  async updateCv(
    @Param('id') id: string,
    @UploadedFile(
      new FileValidatorPipe({
        maxSizeConfig: {
          size: 1024 * 1024 * 5,
          errorMessage: 'File size must be less than 5MB',
        },
        fileTypeConfig: {
          type: /application\/pdf|application\/msword/,
          errorMessage: 'File type must be pdf or doc',
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

    try {
      const cv = await queryRunner.manager.findOneBy(Cv, {
        id,
        candidateId: req.user.element.id,
      });
      if (!cv) {
        throw new NotFoundException('CV not found');
      }
      await this.cloudinaryService.deleteFile(cv.key);
      const { url, key } = await this.cloudinaryService.uploadFile(
        file,
        this.folder,
      );
      const data: UpdateCvDto = {
        name: file.originalname,
        url,
        key,
        format: file.mimetype,
      };
      const updatedCv = await this.cvService.updateCv(
        id,
        data,
        req.user.element.id,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return updatedCv;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @InjectRoute(cvRoutes.delete)
  async deleteCv(@Param('id') id: string, @Req() req: RequestWithUser) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cv = await queryRunner.manager.findOne(Cv, {
        where: { id, candidateId: req.user.element.id },
      });
      if (!cv) {
        throw new NotFoundException('CV not found');
      }
      await Promise.all([
        this.cvService.deleteCv(id, req.user.element.id, queryRunner),
        this.cloudinaryService.deleteFile(cv.key),
      ]);
      await queryRunner.commitTransaction();
      return { message: 'CV deleted successfully' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @InjectRoute(cvRoutes.getMyCv)
  async getMyCv(@Req() req: RequestWithUser) {
    const cvs = await this.cvService.getMyCv(req.user.element.id);
    return cvs;
  }
}
