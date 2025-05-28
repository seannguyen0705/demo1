import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Company } from '@/api/company/entities/company.entity';
import { File } from '@/api/file/entities/file.entity';

@Entity('company_images')
export class CompanyImage extends File {
  @Column({ name: 'company_id' })
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
