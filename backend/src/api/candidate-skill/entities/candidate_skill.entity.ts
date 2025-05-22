import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { Candidate } from '@/api/candidate/entities';
import { Skill } from '../../skill/entities/skill.entity';
import { SkillYear } from '@/common/enums';

@Entity('candidate_skills')
@Unique(['candidateId', 'skillId'])
export class CandidateSkill extends BaseEntity {
  @Column({ name: 'candidate_id' })
  candidateId: string;

  @ManyToOne(() => Candidate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ name: 'skill_id' })
  skillId: string;

  @ManyToOne(() => Skill, (skill) => skill.candidateSkills, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;

  @Column({
    type: 'enum',
    enum: SkillYear,
    name: 'skill_year',
  })
  skillYear: SkillYear;
}
