import { BaseUserEntity } from '@/common/entities/baseUser.entity';
import { UserRole, UserStatus } from '@/common/enums';
import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import { ResponseEmployerDetailDto, ResponseEmployerDto } from '../dto/response-employer.dto';
import { Token } from '@/api/token/entities';
import { hash } from '@/utils/helpers';
import { Company } from '@/api/company/entities/company.entity';

@Entity('employers')
export class Employer extends BaseUserEntity {
  @Column()
  title: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.INACTIVE })
  status: UserStatus;

  @Column({ nullable: true })
  personal_website: string;

  @OneToOne(() => Company, (company) => company.employer)
  company: Company;

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

  public toResponse(): ResponseEmployerDto {
    return {
      ...this,
      role: UserRole.EMPLOYER,
    };
  }

  public toResponseHavingSessions(sessions: Token[]): ResponseEmployerDetailDto {
    return {
      ...this,
      role: UserRole.EMPLOYER,
      sessions,
    };
  }
}
