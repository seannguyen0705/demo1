import { Candidate } from '@/api/candidate/entities/candidate.entity';
import { Base as BaseEntity } from '@/common/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('experiences')
export class Experience extends BaseEntity {
  @Column({ name: 'work_title' })
  workTitle: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'start_date' })
  startDate: string;

  @Column({ name: 'end_date' })
  endDate: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'candidate_id' })
  candidateId: string;

  @ManyToOne(() => Candidate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;
}
