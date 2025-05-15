import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileRepository } from './file.repository';
import { CreateFileDto } from './dto/create-file.dto';
import { QueryRunner } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepository: FileRepository,
  ) {}

  public async create(data: CreateFileDto, queryRunner: QueryRunner) {
    const newFile = queryRunner.manager.create(File, data);
    return queryRunner.manager.save(File, newFile);
  }

  public async deleteById(id: string, queryRunner?: QueryRunner) {
    if (queryRunner) {
      return queryRunner.manager.delete(File, id);
    }
    return this.fileRepository.delete(id);
  }
}
