import { Column, Entity } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: 'provinces' })
export class Province extends BaseEntity {
  @Column()
  name: string;
}
