import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { Candidate } from '@/api/candidate/entities';
import { Skill } from '@/api/skill/entities/skill.entity';
import { Province } from '@/api/province/entities/province.entity';

@Entity('subscribe_skills')
export class SubscribeSkill extends BaseEntity {
  @Column({ name: 'candidate_id' })
  candidateId: string;

  @ManyToOne(() => Candidate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ name: 'skill_id' })
  skillId: string;

  @ManyToOne(() => Skill, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;

  @Column({ name: 'province_id' })
  provinceId: string;

  @ManyToOne(() => Province, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'province_id' })
  province: Province;
}
