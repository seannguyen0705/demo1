import { Check, Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { Candidate } from '@/api/candidate/entities';
import { Company } from '@/api/company/entities/company.entity';

@Entity('reviews')
@Unique(['candidateId', 'companyId'])
@Check('rating >= 0 AND rating <= 5')
export class Review extends BaseEntity {
  @Column()
  @Column({ type: 'decimal', precision: 2, scale: 1, default: 5 })
  rating: number;

  @Column()
  comment: string;

  @Column({ name: 'candidate_id' })
  candidateId: string;

  @ManyToOne(() => Candidate)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ name: 'company_id' })
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
