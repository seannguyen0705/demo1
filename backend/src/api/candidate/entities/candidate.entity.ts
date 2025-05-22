import { BeforeInsert, Column, Entity } from 'typeorm';

import { hash } from '@/utils/helpers';
import { AuthBy, UserRole, UserStatus } from '@/common/enums';

import type { Token } from '@/api/token/entities';
import { BaseUserEntity } from '@/common/entities/baseUser.entity';
import {
  ResponseCandidateDetailDto,
  ResponseCandidateDto,
} from '../dto/response-candidate.dto';

@Entity({ name: 'candidates' })
export class Candidate extends BaseUserEntity {
  @Column({ type: 'enum', enum: AuthBy, default: AuthBy.LOCAL })
  authBy: AuthBy;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  personal_website: string;

  @Column({ nullable: true })
  introduction: string;

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

  public toResponseHavingSessions(
    sessions: Token[],
  ): ResponseCandidateDetailDto {
    return {
      ...this,
      role: UserRole.CANDIDATE,
      sessions,
    };
  }
}
