import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidateSkill } from './entities/candidate_skill.entity';
import { CandidateSkillRepository } from './candidate-skill.repository';
import { CreateCandidateSkillDto } from './dto/create-candidate-skill.dto';

@Injectable()
export class CandidateSkillService {
  constructor(
    @InjectRepository(CandidateSkill)
    private readonly candidateSkillRepository: CandidateSkillRepository,
  ) {}

  public async create(
    candidateId: string,
    data: CreateCandidateSkillDto,
  ): Promise<CandidateSkill> {
    const existingCandidateSkill = await this.candidateSkillRepository.findOne({
      where: { candidateId, skillId: data.skillId },
    });

    if (existingCandidateSkill) {
      throw new BadRequestException('Đã thêm kĩ năng này rồi');
    }
    const candidateSkill = this.candidateSkillRepository.create({
      ...data,
      candidateId,
    });

    return this.candidateSkillRepository.save(candidateSkill);
  }

  public async delete(id: string, candidateId: string): Promise<void> {
    await this.candidateSkillRepository.delete({ id, candidateId });
  }

  public async findAllByCandidateId(
    candidateId: string,
  ): Promise<CandidateSkill[]> {
    return this.candidateSkillRepository.find({
      where: { candidateId },
      relations: {
        skill: true,
      },
    });
  }
}
