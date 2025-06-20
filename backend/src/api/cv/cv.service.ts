import { Injectable, NotFoundException } from '@nestjs/common';
import { CvExpository } from './cv.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';

import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateFileDto } from '../file/dto/create-file.dto';
import { File } from '../file/entities/file.entity';

@Injectable()
export class CvService {
  maxNumCv: number;
  private readonly folder: string;
  constructor(
    @InjectRepository(Cv) private readonly cvRepository: CvExpository,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly cloudinaryService: CloudinaryService,
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
      const countCv = await queryRunner.manager.count(Cv, { where: { candidateId } });
      if (countCv >= this.maxNumCv) {
        const oldestCv = await queryRunner.manager.findOne(Cv, {
          where: { candidateId },
          order: { createdAt: 'ASC' },
        });
        await queryRunner.manager.delete(Cv, { id: oldestCv.id });
      }
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

      const { url, key } = await this.cloudinaryService.uploadFile(file, this.folder);
      const data: CreateFileDto = {
        name: file.originalname,
        url,
        key,
        format: file.mimetype,
      };
      const newFile = await queryRunner.manager.save(File, data);
      await queryRunner.manager.update(Cv, { id }, { fileId: newFile.id });
      await queryRunner.commitTransaction();
      return newFile;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteCv(id: string, candidateId: string) {
    const cv = await this.cvRepository.findOne({ where: { id, candidateId } });
    if (!cv) {
      throw new NotFoundException('CV not found');
    }
    return this.cvRepository.delete(id);
  }

  async getCvByCandidateId(candidateId: string) {
    return this.cvRepository.find({ where: { candidateId }, order: { createdAt: 'ASC' } });
  }

  async getCvByIdAndCandidateId(id: string, candidateId: string) {
    return this.cvRepository.findOne({ where: { id, candidateId } });
  }

  async getCvByCandidateIdAndFileId(candidateId: string, fileId: string) {
    return this.cvRepository.findOne({ where: { candidateId, fileId } });
  }
}
