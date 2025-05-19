import { BeforeInsert, Column, Entity } from 'typeorm';

import { hash } from '@/utils/helpers';
import { UserRole, UserStatus } from '@/common/enums';

import type { Token } from '@/api/token/entities';
import { BaseUserEntity } from '@/common/entities/baseUser.entity';
import {
  ResponseAdminDetailDto,
  ResponseAdminDto,
} from '../dto/response-admin.dto';

@Entity({ name: 'admins' })
export class Admin extends BaseUserEntity {
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @BeforeInsert()
  private async setInsertingData(): Promise<void> {
    const saltRounds = 10;

    this.password = await hash.generateWithBcrypt({
      source: this.password,
      salt: saltRounds,
    });
  }

  public toResponse(): ResponseAdminDto {
    return {
      ...this,
      role: UserRole.ADMIN,
    };
  }

  public toResponseHavingSessions(sessions: Token[]): ResponseAdminDetailDto {
    return {
      ...this,
      role: UserRole.ADMIN,
      sessions,
    };
  }
}
