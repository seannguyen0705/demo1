import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperienceRepository } from './experience.repository';
import { Experience } from './entities/experience.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: ExperienceRepository,
  ) {}

  async create(data: CreateExperienceDto) {
    return this.experienceRepository.save(data);
  }

  async findMyExperiences(userId: string) {
    return this.experienceRepository.find({
      where: {
        candidateId: userId,
      },
    });
  }

  async delete(id: string, candidateId: string) {
    const experience = await this.experienceRepository.findOneBy({
      id,
      candidateId,
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    return this.experienceRepository.remove(experience);
  }

  async update(id: string, candidateId: string, data: UpdateExperienceDto) {
    const experience = await this.experienceRepository.findOneBy({
      id,
      candidateId,
    });

    if (!experience) {
      throw new NotFoundException('Experience not found');
    }

    return this.experienceRepository.save({
      ...experience,
      ...data,
    });
  }
}
