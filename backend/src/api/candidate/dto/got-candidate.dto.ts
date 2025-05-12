import { ApiProperty } from '@nestjs/swagger';

import { enumh } from '@/utils/helpers';
import { ActionedBaseDto } from '@/common/dto';
import { Gender, UserRole } from '@/common/enums';

class GotCandidateSessionDto extends ActionedBaseDto {}

export class GotCandidateDto extends ActionedBaseDto {
  @ApiProperty({
    enum: UserRole,
    default: enumh.getFirstKey<typeof UserRole>(UserRole),
  })
  role: UserRole;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ example: 'Lorem' })
  firstName: string;

  @ApiProperty({ example: 'Lorem' })
  lastName: string;

  @ApiProperty({
    enum: Gender,
    required: false,
  })
  gender?: Gender;

  @ApiProperty({
    format: 'date',
    required: false,
  })
  bod?: Date;

  @ApiProperty({ example: '0123456789' })
  phoneNumber: string;
}

export class GotCandidateDetailDto extends GotCandidateDto {
  @ApiProperty({ isArray: true })
  sessions: GotCandidateSessionDto[];
}
