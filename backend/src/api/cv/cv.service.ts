import { Injectable, NotFoundException } from '@nestjs/common';
import { CvExpository } from './cv.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';

import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileService } from '../file/file.service';
import { CreateFileDto } from '../file/dto/create-file.dto';
import { File } from '../file/entities/file.entity';
import { UpdateFileDto } from '../file/dto/update-file.dto';

@Injectable()
export class CvService {
  maxNumCv: number;
  private readonly folder: string;
  constructor(
    @InjectRepository(Cv) private readonly cvRepository: CvExpository,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly cloudinaryService: CloudinaryService,
    private readonly fileService: FileService,
  ) {
    this.maxNumCv = 3;
    this.folder = 'candidate/cv';
  }

  async createCv(candidateId: string, file: Express.Multer.File) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let uploadedFile: { url: string; key: string };

    try {
      uploadedFile = await this.cloudinaryService.uploadFile(file, this.folder);
      const data: CreateFileDto = {
        name: file.originalname,
        url: uploadedFile.url,
        key: uploadedFile.key,
        format: file.mimetype,
      };
      const newFile = await queryRunner.manager.save(File, data);
      const cv = await queryRunner.manager.save(Cv, {
        candidateId,
        fileId: newFile.id,
      });
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

  async updateCv(id: string, candidateId: string, file: Express.Multer.File) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cv = await queryRunner.manager.findOneBy(Cv, {
        id,
        candidateId,
      });
      if (!cv) {
        throw new NotFoundException('CV not found');
      }
      await this.cloudinaryService.deleteFile(cv.file.key);
      const { url, key } = await this.cloudinaryService.uploadFile(file, this.folder);
      const data: UpdateFileDto = {
        name: file.originalname,
        url,
        key,
        format: file.mimetype,
      };
      const updateResult = await queryRunner.manager.update(File, cv.file.id, data);
      await queryRunner.commitTransaction();
      return updateResult;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteCv(id: string, candidateId: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cv = await queryRunner.manager.findOne(Cv, {
        where: { id, candidateId },
      });
      if (!cv) {
        throw new NotFoundException('CV not found');
      }

      await queryRunner.manager.delete(Cv, { id, candidateId });
      await this.cloudinaryService.deleteFile(cv.file.key);
      await queryRunner.commitTransaction();
      return { message: 'CV deleted successfully' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getMyCv(candidateId: string) {
    return this.cvRepository.find({ where: { candidateId } });
  }
}
