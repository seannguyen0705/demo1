import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Company } from '@/api/company/entities/company.entity';
import { Base as BaseEntity } from '@/common/entities';
import { File } from '@/api/file/entities/file.entity';

@Entity('company_images')
export class CompanyImage extends BaseEntity {
  @Column({ name: 'company_id' })
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ name: 'file_id' })
  fileId: string;

  @ManyToOne(() => File, { eager: true })
  @JoinColumn({ name: 'file_id' })
  file: File;
}
