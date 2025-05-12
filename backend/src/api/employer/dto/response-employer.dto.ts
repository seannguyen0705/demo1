import { UserRole } from '@/common/enums';
import { Employer } from '../entities/employer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Token } from '@/api/token/entities';

export class ResponseEmployerDto extends Employer {
  @ApiProperty({
    example: UserRole.EMPLOYER,
  })
  role: UserRole;
}

export class ResponseEmployerDetailDto extends ResponseEmployerDto {
  @ApiProperty({
    type: Token,
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
      },
    ],
  })
  sessions: Token[];
}
