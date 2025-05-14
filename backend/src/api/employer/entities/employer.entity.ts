import { BaseUserEntity } from '@/common/entities/baseUser.entity';
import { UserRole, UserStatus } from '@/common/enums';
import { BeforeInsert, Column, Entity } from 'typeorm';
import {
  ResponseEmployerDetailDto,
  ResponseEmployerDto,
} from '../dto/response-employer.dto';
import { Token } from '@/api/token/entities';
import { hash } from '@/utils/helpers';

@Entity('employers')
export class Employer extends BaseUserEntity {
  @Column({ name: 'work_title' })
  workTitle: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.INACTIVE })
  status: UserStatus;

  @BeforeInsert()
  private async setInsertingData(): Promise<void> {
    const saltRounds = 10;

    this.password = await hash.generateWithBcrypt({
      source: this.password,
      salt: saltRounds,
    });
  }

  public toResponse(): ResponseEmployerDto {
    return {
      ...this,
      role: UserRole.CANDIDATE,
    };
  }

  public toResponseHavingSessions(
    sessions: Token[],
  ): ResponseEmployerDetailDto {
    return {
      ...this,
      role: UserRole.EMPLOYER,
      sessions,
    };
  }
}
