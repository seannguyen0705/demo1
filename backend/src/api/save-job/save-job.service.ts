import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveJob } from './entities/save-job.entity';
import { SaveJobRepository } from './save-job.repository';
import { CreateSaveJobDto } from './dto/create-save-job.dto';
@Injectable()
export class SaveJobService {
  constructor(@InjectRepository(SaveJob) private readonly saveJobRepository: SaveJobRepository) {}

  public async createSaveJob(data: CreateSaveJobDto) {
    const saveJob = this.saveJobRepository.create(data);
    return this.saveJobRepository.save(saveJob);
  }

  public async deleteSaveJob(id: string, candidateId: string) {
    const saveJob = await this.saveJobRepository.findOneBy({ id, candidateId });
    if (!saveJob) {
      throw new NotFoundException('Save job not found');
    }
    return this.saveJobRepository.remove(saveJob);
  }
}
