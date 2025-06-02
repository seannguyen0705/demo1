import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { Company } from '@/api/company/entities/company.entity';
import { Address } from '@/api/address/entities/address.entity';

@Entity('company_addresses')
export class CompanyAddress extends BaseEntity {
  @Column({ name: 'company_id' })
  companyId: string;

  @Column({ name: 'address_id' })
  addressId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
