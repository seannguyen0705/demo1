import { Candidate } from '@/api/candidate/entities';
import { File } from '@/api/file/entities/file.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';

@Entity('cvs')
export class Cv extends BaseEntity {
  @Column({ name: 'candidate_id' })
  candidateId: string;

  @ManyToOne(() => Candidate)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;

  @Column({ name: 'file_id' })
  fileId: string;

  @ManyToOne(() => File, { eager: true })
  @JoinColumn({ name: 'file_id' })
  file: File;
}
