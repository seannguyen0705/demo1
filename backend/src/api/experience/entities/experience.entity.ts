import { Candidate } from '@/api/candidate/entities/candidate.entity';
import { Base as BaseEntity } from '@/common/entities';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('experiences')
export class Experience extends BaseEntity {
  @Column()
  workTitle: string;

  @Column()
  companyName: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'candidate_id' })
  candidateId: string;

  @ManyToOne(() => Candidate)
  candidate: Candidate;
}
