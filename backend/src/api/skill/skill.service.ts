import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SkillRepository } from './skill.repository';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { QuerySkillDto } from './dto/query-skill.dto';
import { CandidateSkillService } from '../candidate-skill/candidate-skill.service';
import { ILike } from 'typeorm';
@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill) private skillRepository: SkillRepository,
    private readonly candidateSkillService: CandidateSkillService,
  ) {}

  public async create(data: CreateSkillDto): Promise<Skill> {
    await this.checkSkillExists(data.name);

    const skill = this.skillRepository.create(data);

    return this.skillRepository.save(skill);
  }

  public async findAll(
    query: QuerySkillDto,
    candidateId?: string,
  ): Promise<{
    skills: Skill[];
    currentPage: number;
    nextPage: number | null;
    total: number;
  }> {
    const { page, limit, keyword, excludeSkillIds } = query;
    const queryBuilder = this.skillRepository
      .createQueryBuilder('skill')
      .select(['skill.id', 'skill.name'])
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('skill.name', 'ASC');

    if (keyword) {
      queryBuilder.andWhere('skill.name ILIKE :keyword', {
        keyword: `%${keyword}%`,
      });
    }

    if (excludeSkillIds.length && excludeSkillIds[0]) {
      queryBuilder.andWhere('skill.id NOT IN (:...excludeSkillIds)', {
        excludeSkillIds,
      });
    }

    if (candidateId) {
      // not get skill that candidate already have
      const candidateSkills = await this.candidateSkillService.findAllByCandidateId(candidateId);
      const candidateSkillIds = candidateSkills.map((skill) => skill.skillId);
      if (candidateSkillIds.length) {
        queryBuilder.andWhere('skill.id NOT IN (:...candidateSkillIds)', {
          candidateSkillIds,
        });
      }
    }

    const [skills, total] = await queryBuilder.getManyAndCount();
    const numPage = Math.ceil(total / limit);
    if (page + 1 > numPage) {
      return { skills, currentPage: page, nextPage: null, total };
    }
    return {
      skills,
      currentPage: page,
      nextPage: page + 1,
      total,
    };
  }

  public async update(id: string, data: UpdateSkillDto): Promise<Skill> {
    const skill = await this.skillRepository.findOneBy({ id });

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    await this.checkSkillExists(data.name);

    skill.name = data.name;

    return this.skillRepository.save(skill);
  }

  private async checkSkillExists(name: string): Promise<void> {
    const existingSkill = await this.skillRepository.findOneBy({ name });

    if (existingSkill) {
      throw new BadRequestException('Skill already exists');
    }
  }

  public async delete(id: string): Promise<void> {
    const skill = await this.skillRepository.findOneBy({ id });

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    await this.skillRepository.delete(id);
  }

  public async findOneByName(name: string): Promise<Skill> {
    return this.skillRepository.findOne({
      where: { name: ILike(name) },
    });
  }
}
