import { Column, Entity } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
@Entity({ name: 'files' })
export class File extends BaseEntity {
  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  key: string;

  @Column()
  format: string;
}
