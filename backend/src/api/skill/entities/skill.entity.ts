import { Column, Entity, OneToMany } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { CandidateSkill } from '@/api/candidate-skill/entities/candidate_skill.entity';

@Entity('skills')
export class Skill extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => CandidateSkill, (candidateSkill) => candidateSkill.skill)
  candidateSkills: CandidateSkill[];
}
