import { ApiProperty } from '@nestjs/swagger';

import { ActionedBaseDto } from '@/common/dto';
import { Gender, UserRole } from '@/common/enums';

class LoggedInUserInfoDto extends ActionedBaseDto {
  @ApiProperty({
    enum: UserRole,
    default: UserRole.CANDIDATE,
  })
  role: UserRole;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty()
  fullName: string;

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

  @ApiProperty({})
  avatarId?: string;

  @ApiProperty({ example: '0123456789' })
  phoneNumber?: string;
}

export class LoggedInDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOjAsImlhdCI6MTY2MjYzMTkzOCwiZXhwIjoxNjY1MjIzOTM4fQ.d806NRcVKaBY1cAXjiMuJvLMg0DxTYdDkd269ETKnNU',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOjAsImlhdCI6MTY2MjYzMTkzOCwiZXhwIjoxNjY1MjIzOTM4fQ.d806NRcVKaBY1cAXjiMuJvLMg0DxTYdDkd269ETKnNU',
  })
  refreshToken: string;

  @ApiProperty()
  userInfo: LoggedInUserInfoDto;
}
