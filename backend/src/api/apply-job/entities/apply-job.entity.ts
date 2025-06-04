import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { Cv } from '@/api/cv/entities/cv.entity';

@Entity('apply_jobs')
export class ApplyJob extends BaseEntity {
  @Column({ name: 'job_id' })
  jobId: string;

  @Column({ name: 'cv_id' })
  cvId: string;

  @ManyToOne(() => Cv)
  @JoinColumn({ name: 'cv_id' })
  cv: Cv;

  @Column({ nullable: true })
  message: string;
}
