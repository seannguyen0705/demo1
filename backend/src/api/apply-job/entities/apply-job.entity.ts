import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { Job } from '@/api/job/entities/job.entity';
import { ApplyJobStatus } from '@/common/enums';
import { Candidate } from '@/api/candidate/entities';
import { File } from '@/api/file/entities/file.entity';

@Entity('apply_jobs')
@Unique(['jobId', 'candidateId'])
export class ApplyJob extends BaseEntity {
  @Column({ name: 'job_id' })
  jobId: string;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @Column({ name: 'candidate_id' })
  candidateId: string;

  @ManyToOne(() => Candidate)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ name: 'file_id' })
  fileId: string;

  @ManyToOne(() => File)
  @JoinColumn({ name: 'file_id' })
  file: File;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'expected_address' })
  expectedAddress: string;

  @Column({ name: 'message' })
  message: string;

  @Column({ name: 'status', default: ApplyJobStatus.NEW })
  status: ApplyJobStatus;
}
