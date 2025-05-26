import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { Skill } from './entities/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateSkillModule } from '../candidate-skill/candidate-skill.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), CandidateSkillModule],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
