import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { File } from '@/api/file/entities/file.entity';
import { Employer } from '@/api/employer/entities/employer.entity';
import { Review } from '@/api/review/entities/review.entity';
import { Job } from '@/api/job/entities/job.entity';
import { Address } from '@/api/address/entities/address.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  size?: string; // 1-50 , 50

  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  industry?: string;

  @Column({ nullable: true, name: 'working_day' })
  workingDay?: string; // Thứ 2 - Thứ 7

  @Column({ nullable: true, name: 'working_time' })
  workingTime?: string; // 8:00 - 17:00

  @Column({ type: 'text', nullable: true })
  overview?: string;

  @Column({ type: 'text', nullable: true })
  benefits?: string;

  @ManyToMany(() => Address, { cascade: true })
  @JoinTable({
    name: 'company_addresses',
    joinColumn: { name: 'company_id' },
    inverseJoinColumn: { name: 'address_id' },
  })
  addresses: Address[];

  @Column()
  website: string;

  @Column({ name: 'background_id', nullable: true })
  backgroundId?: string;

  @OneToOne(() => File)
  @JoinColumn({ name: 'background_id' })
  background?: File;

  @Column({ name: 'logo_id', nullable: true })
  logoId?: string;

  @OneToOne(() => File)
  @JoinColumn({ name: 'logo_id' })
  logo?: File;

  @OneToOne(() => File, { cascade: true })
  @JoinColumn({ name: 'proof_id' })
  proof: File;

  @Column({ name: 'proof_id' })
  proofId: string;

  @Column({ nullable: true })
  country: string;

  @Column({ name: 'employer_id' })
  employerId: string;

  @OneToOne(() => Employer, (employer) => employer.company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employer_id' })
  employer: Employer;

  @OneToMany(() => Review, (review) => review.company)
  reviews: Review[];

  @OneToMany(() => Job, (job) => job.company, { cascade: true })
  jobs: Job[];
}
