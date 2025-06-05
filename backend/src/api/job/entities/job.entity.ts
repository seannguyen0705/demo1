import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { JobType, JobStatus, SalaryType, JobLevel } from '@/common/enums';
import { Company } from '@/api/company/entities/company.entity';
import { JobAddress } from '@/api/job-address/entities/job-address.entity';
import { JobSkill } from '@/api/job-skill/entities/job-skill.entity';
import { ApplyJob } from '@/api/apply-job/entities/apply-job.entity';
import { SaveJob } from '@/api/save-job/entities/save-job.entity';
// allow save draft job, so many attribute is nullable
@Entity('jobs')
@Unique(['companyId', 'title'])
@Check('salary_min <= salary_max')
export class Job extends BaseEntity {
  @Column({ nullable: true })
  title: string;

  @Column({
    type: 'enum',
    enum: SalaryType,
    name: 'salary_type',
    nullable: true,
  })
  salaryType: SalaryType;

  @Column({ nullable: true, name: 'salary_min' })
  salaryMin: number;

  @Column({ nullable: true, name: 'salary_max' })
  salaryMax: number;

  @Column({
    type: 'enum',
    enum: JobType,
    name: 'job_type',
    nullable: true,
  })
  jobType: JobType;

  @Column({
    name: 'job_expertise',
    nullable: true,
  })
  jobExpertise: string;

  @Column({
    name: 'job_domain',
    nullable: true,
  })
  jobDomain: string;

  @Column({
    type: 'enum',
    enum: JobLevel,
    name: 'job_level',
    nullable: true,
  })
  jobLevel: JobLevel;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  requirement: string;

  @Column({ nullable: true })
  benefit: string;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.DRAFT,
  })
  status: JobStatus;

  @Column({ name: 'company_id' })
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => JobAddress, (jobAddress) => jobAddress.job)
  jobAddresses: JobAddress[];

  @OneToMany(() => JobSkill, (jobSkill) => jobSkill.job)
  jobSkills: JobSkill[];

  @OneToMany(() => ApplyJob, (applyJob) => applyJob.job)
  applyJobs: ApplyJob[];

  @OneToMany(() => SaveJob, (saveJob) => saveJob.job)
  saveJobs: SaveJob[];
}
