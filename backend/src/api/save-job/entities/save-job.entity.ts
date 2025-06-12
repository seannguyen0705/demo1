import { Base as BaseEntity } from '@/common/entities';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Job } from '@/api/job/entities/job.entity';
import { Candidate } from '@/api/candidate/entities';

@Entity('save_jobs')
@Unique(['jobId', 'candidateId'])
export class SaveJob extends BaseEntity {
  @Column({ name: 'job_id' })
  jobId: string;

  @ManyToOne(() => Job, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @Column({ name: 'candidate_id' })
  candidateId: string;

  @ManyToOne(() => Candidate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;
}
