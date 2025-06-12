import { Column, JoinColumn, OneToOne } from 'typeorm';
import { Base as BaseEntity } from './base.entity';
import { Exclude } from 'class-transformer';
import { Gender } from '../enums';
import { File } from '@/api/file/entities/file.entity';

export class BaseUserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'phone_number', unique: true, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  // @Column({ name: 'count_violation', default: 0 })
  // countViolation: number;

  @Column({ type: 'date', nullable: true })
  bod?: Date;

  @Column({ name: 'avatar_id', nullable: true })
  avatarId?: string;

  @OneToOne(() => File, { eager: true })
  @JoinColumn({ name: 'avatar_id' })
  avatar?: File;

  @Column({ nullable: true, name: 'account_token' })
  accountToken?: string;
}
