import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';
import { File } from '@/api/file/entities/file.entity';

@Entity({ name: 'contacts' })
export class Contact extends BaseEntity {
  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'file_id', nullable: true })
  fileId: string;

  @OneToOne(() => File, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'file_id' })
  file: File;
}
