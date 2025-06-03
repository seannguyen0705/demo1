import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { Job } from '@/api/job/entities/job.entity';
import { Skill } from '@/api/skill/entities/skill.entity';

@Entity('job_skill')
@Unique(['jobId', 'skillId'])
export class JobSkill extends BaseEntity {
  @Column({ name: 'job_id' })
  jobId: string;

  @Column({ name: 'skill_id' })
  skillId: string;

  @ManyToOne(() => Job, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => Skill, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;
}
