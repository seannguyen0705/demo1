import { Column } from 'typeorm';
import { Base as BaseEntity } from './base.entity';
import { Exclude } from 'class-transformer';
import { Gender } from '../enums';

export abstract class BaseUserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'phone_number', unique: true, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ type: 'date', nullable: true })
  bod?: Date;
}
