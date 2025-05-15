import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { File } from '@/api/file/entities/file.entity';
import { Employer } from '@/api/employer/entities/employer.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  companySize?: number;

  @Column({ type: 'text', nullable: true })
  overview?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  address: string[];

  @Column()
  website: string;

  @OneToOne(() => File)
  @JoinColumn({ name: 'logo_id' })
  logo?: File;

  @Column({ name: 'logo_id', nullable: true })
  logoId?: string;

  @OneToOne(() => File)
  @JoinColumn({ name: 'proof_id' })
  proof: File;

  @Column({ name: 'proof_id' })
  proofId: string;

  @Column({ name: 'employer_id' })
  employerId: string;

  @OneToOne(() => Employer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'employer_id' })
  employer: Employer;
}
