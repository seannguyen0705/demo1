import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { UserRole } from '@/common/enums';
import { Base as BaseEntity } from '@/common/entities';

@Entity({ name: 'tokens' })
export class Token extends BaseEntity {
  @Exclude()
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Exclude()
  @Column({
    type: 'enum',
    enum: UserRole,
    name: 'user_role',
    default: UserRole.CANDIDATE,
  })
  userRole: UserRole;

  @Exclude()
  @Column({ name: 'access_token' })
  accessToken: string;

  @Exclude()
  @Column({ name: 'refresh_token' })
  refreshToken: string;
}
