import { Module } from '@nestjs/common';
import { CandidateSkillService } from './candidate-skill.service';
import { CandidateSkillController } from './candidate-skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateSkill } from './entities/candidate_skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateSkill])],
  controllers: [CandidateSkillController],
  providers: [CandidateSkillService],
  exports: [CandidateSkillService],
})
export class CandidateSkillModule {}
