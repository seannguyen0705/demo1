import { BeforeInsert, Entity } from 'typeorm';

import { hash } from '@/utils/helpers';
import { UserRole } from '@/common/enums';

import type { Token } from '@/api/token/entities';
import { BaseUserEntity } from '@/common/entities/baseUser.entity';
import {
  ResponseCandidateDetailDto,
  ResponseCandidateDto,
} from '../dto/response-candidate.dto';

@Entity({ name: 'candidates' })
export class Candidate extends BaseUserEntity {
  @BeforeInsert()
  private async setInsertingData(): Promise<void> {
    const saltRounds = 10;

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
