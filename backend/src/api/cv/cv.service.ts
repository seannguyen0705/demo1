import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CvExpository } from './cv.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { CreateCvDto } from './dto/create-cv.dto';
import { QueryRunner } from 'typeorm';
import { UpdateCvDto } from './dto/update-cv.dto';

@Injectable()
export class CvService {
  maxNumCv: number;
  constructor(@InjectRepository(Cv) private readonly cvRepository: CvExpository) {
    this.maxNumCv = 3;
  }

  async createCv(data: CreateCvDto, queryRunner: QueryRunner) {
    const myCv = await this.getMyCv(data.candidateId);
    if (myCv.length >= this.maxNumCv) {
      throw new BadRequestException('Đăng tải tối đa 3 CV');
    }
    const cv = queryRunner.manager.create(Cv, data);
    return queryRunner.manager.save(Cv, cv);
  }

  async updateCv(id: string, data: UpdateCvDto, candidateId: string, queryRunner: QueryRunner) {
    const cv = await queryRunner.manager.findOne(Cv, {
      where: { id, candidateId },
    });
    if (!cv) {
      throw new NotFoundException('CV not found');
    }
    return queryRunner.manager.save(Cv, { ...cv, ...data });
  }

  async deleteCv(id: string, candidateId: string, queryRunner: QueryRunner) {
    return queryRunner.manager.delete(Cv, { id, candidateId });
  }

  async getMyCv(candidateId: string) {
    return this.cvRepository.find({ where: { candidateId } });
  }
}
