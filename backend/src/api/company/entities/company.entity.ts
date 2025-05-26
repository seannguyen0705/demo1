import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { File } from '@/api/file/entities/file.entity';
import { Employer } from '@/api/employer/entities/employer.entity';

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

  @Column({ nullable: true })
  workingDay?: string; // Thứ 2 - Thứ 7

  @Column({ nullable: true })
  workingTime?: string; // 8:00 - 17:00

  @Column({ type: 'text', nullable: true, default: '' })
  overview?: string;

  @Column({ type: 'text', nullable: true, default: '' })
  benefits?: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  address: string[];

  @Column()
  website: string;

  @Column({ name: 'background_id', nullable: true })
  backgroundId: string;

  @OneToOne(() => File)
  @JoinColumn({ name: 'background_id' })
  background?: File;

  @Column({ name: 'logo_id', nullable: true })
  logoId?: string;

  @OneToOne(() => File)
  @JoinColumn({ name: 'logo_id' })
  logo?: File;

  @OneToOne(() => File)
  @JoinColumn({ name: 'proof_id' })
  proof: File;

  @Column({ name: 'proof_id' })
  proofId: string;

  @Column({ nullable: true })
  country: string;

  @Column({ name: 'employer_id' })
  employerId: string;

  @OneToOne(() => Employer, (employer) => employer.company, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'employer_id' })
  employer: Employer;
}
