import { ApiProperty } from '@nestjs/swagger';
import { Candidate } from '../entities';
import { UserRole } from '@/common/enums';
import { Token } from '@/api/token/entities';

export class ResponseCandidateDto extends Candidate {
  @ApiProperty({
    example: UserRole.CANDIDATE,
  })
  role: UserRole;
}

export class ResponseCandidateDetailDto extends ResponseCandidateDto {
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
