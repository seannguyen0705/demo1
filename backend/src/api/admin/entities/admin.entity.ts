import { Exclude, plainToInstance } from 'class-transformer';

import { Column, Entity, BeforeInsert } from 'typeorm';

import { hash } from '@/utils/helpers';
import { Gender, UserRole } from '@/common/enums';
import { Base as BaseEntity } from '@/common/entities';

import type { Token } from '@/api/token/entities';

@Entity({ name: 'admins' })
export class Admin extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ type: 'date', nullable: true })
  bod?: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;

  @BeforeInsert()
  private async setInsertingData(): Promise<void> {
    const saltRounds = 10;

    this.password = await hash.generateWithBcrypt({
      source: this.password,
      salt: saltRounds,
    });
  }

  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public toResponse(): Omit<
    Admin,
    'fullName' | 'toResponse' | 'toResponseHavingSessions' | 'password'
  > & {
    role: UserRole;
  } {
    return {
      ...plainToInstance(Admin, this),
      role: UserRole.ADMIN,
    };
  }

  public toResponseHavingSessions(sessions: Token[]): Omit<
    Admin,
    'fullName' | 'toResponse' | 'toResponseHavingSessions' | 'password'
  > & {
    sessions: Token[];
    role: UserRole;
  } {
    return {
      ...this.toResponse(),
      sessions,
    };
  }
}
