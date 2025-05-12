import { UserRole } from '@/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '../entities';
import { Token } from '@/api/token/entities';

export class ResponseAdminDto extends Admin {
  @ApiProperty({
    example: UserRole.ADMIN,
  })
  role: UserRole;
}

export class ResponseAdminDetailDto extends ResponseAdminDto {
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
