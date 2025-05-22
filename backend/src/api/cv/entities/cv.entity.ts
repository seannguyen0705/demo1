import { Candidate } from '@/api/candidate/entities';
import { File } from '@/api/file/entities/file.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('cvs')
export class Cv extends File {
  @Column({ name: 'candidte_id' })
  candidateId: string;

  @ManyToOne(() => Candidate)
  @JoinColumn({ name: 'candidate_id' })
  candidate: Candidate;
}
