import { Province } from '@/api/province/entities/province.entity';
import { Base as BaseEntity } from '@/common/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('addresses')
export class Address extends BaseEntity {
  @Column()
  detail: string;

  @Column({ name: 'province_id' })
  provinceId: string;

  @ManyToOne(() => Province)
  @JoinColumn({ name: 'province_id' })
  province: Province;
}
