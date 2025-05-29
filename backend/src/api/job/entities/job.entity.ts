import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { JobType, JobStatus } from '@/common/enums';
import { Company } from '@/api/company/entities/company.entity';

@Entity('jobs')
export class Job extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: JobType,
    name: 'job_type',
  })
  jobType: JobType;

  @Column({
    type: 'enum',
    enum: JobStatus,
  })
  status: JobStatus;

  @Column()
  salary: string;

  @Column({ name: 'company_id' })
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
