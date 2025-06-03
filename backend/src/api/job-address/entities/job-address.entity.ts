import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Base } from '@/common/entities';
import { Job } from '@/api/job/entities/job.entity';
import { Address } from '@/api/address/entities/address.entity';
@Entity('job_addresses')
export class JobAddress extends Base {
  @Column({ name: 'job_id' })
  jobId: string;

  @Column({ name: 'address_id' })
  addressId: string;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
