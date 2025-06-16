import { Check, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { JobType, JobStatus, SalaryType, JobLevel } from '@/common/enums';
import { Company } from '@/api/company/entities/company.entity';
import { ApplyJob } from '@/api/apply-job/entities/apply-job.entity';
import { SaveJob } from '@/api/save-job/entities/save-job.entity';
import { Address } from '@/api/address/entities/address.entity';
import { Skill } from '@/api/skill/entities/skill.entity';
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

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'text' })
  requirement: string;

  @Column({ nullable: true, type: 'text' })
  benefit: string;

  @Column({ default: 0, name: 'view_count' })
  viewCount: number;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.DRAFT,
  })
  status: JobStatus;

  @Column({ name: 'company_id' })
  companyId: string;

  @Column({ type: 'timestamptz', name: 'expired_at', nullable: true })
  expiredAt: Date;

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToMany(() => Address, { cascade: true })
  @JoinTable({
    name: 'job_addresses',
    joinColumn: { name: 'job_id' },
    inverseJoinColumn: { name: 'address_id' },
  })
  addresses: Address[];

  @ManyToMany(() => Skill, { cascade: true })
  @JoinTable({
    name: 'job_skills',
    joinColumn: { name: 'job_id' },
    inverseJoinColumn: { name: 'skill_id' },
  })
  skills: Skill[];

  @OneToMany(() => ApplyJob, (applyJob) => applyJob.job)
  applyJobs: ApplyJob[];

  @OneToMany(() => SaveJob, (saveJob) => saveJob.job)
  saveJobs: SaveJob[];
}
