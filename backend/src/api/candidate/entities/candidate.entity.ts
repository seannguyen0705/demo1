import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

import { hash } from '@/utils/helpers';
import { AuthBy, UserRole, UserStatus } from '@/common/enums';

import type { Token } from '@/api/token/entities';
import { BaseUserEntity } from '@/common/entities/baseUser.entity';
import { ResponseCandidateDetailDto, ResponseCandidateDto } from '../dto/response-candidate.dto';
import { Experience } from '@/api/experience/entities/experience.entity';
import { CandidateSkill } from '@/api/candidate-skill/entities/candidate_skill.entity';

@Entity({ name: 'candidates' })
export class Candidate extends BaseUserEntity {
  @Column({ type: 'enum', enum: AuthBy, default: AuthBy.LOCAL, name: 'auth_by' })
  authBy: AuthBy;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.INACTIVE })
  status: UserStatus;

  @Column({ nullable: true, name: 'avatar_url' })
  avatar_url: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, name: 'personal_website' })
  personalWebsite: string;

  @Column({ nullable: true })
  introduction: string;

  @OneToMany(() => Experience, (experience) => experience.candidate)
  experiences: Experience[];

  @OneToMany(() => CandidateSkill, (candidateSkill) => candidateSkill.candidate)
  candidateSkills: CandidateSkill[];

  @BeforeInsert()
  private async setInsertingData(): Promise<void> {
    const saltRounds = 10;

    if (!this.password) {
      return;
    }

    this.password = await hash.generateWithBcrypt({
      source: this.password,
      salt: saltRounds,
    });
  }

  public toResponse(): ResponseCandidateDto {
    return {
      ...this,
      role: UserRole.CANDIDATE,
    };
  }

  public toResponseHavingSessions(sessions: Token[]): ResponseCandidateDetailDto {
    return {
      ...this,
      role: UserRole.CANDIDATE,
      sessions,
    };
  }
}
