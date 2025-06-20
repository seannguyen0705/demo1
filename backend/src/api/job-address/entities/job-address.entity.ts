import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Job } from '@/api/job/entities/job.entity';
import { Address } from '@/api/address/entities/address.entity';
@Entity('job_addresses')
export class JobAddress {
  @PrimaryColumn({ name: 'job_id' })
  jobId: string;

  @PrimaryColumn({ name: 'address_id' })
  addressId: string;

  @ManyToOne(() => Job, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => Address, { onDelete: 'CASCADE' })
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
