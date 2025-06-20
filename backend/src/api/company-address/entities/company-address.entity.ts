import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Company } from '@/api/company/entities/company.entity';
import { Address } from '@/api/address/entities/address.entity';

@Entity('company_addresses')
export class CompanyAddress {
  @PrimaryColumn({ name: 'company_id' })
  companyId: string;

  @PrimaryColumn({ name: 'address_id' })
  addressId: string;

  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToOne(() => Address, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
