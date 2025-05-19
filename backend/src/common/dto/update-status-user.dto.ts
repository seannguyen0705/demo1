import { UserStatus } from '@/common/enums';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusUserDto {
  @IsEnum(UserStatus)
  @IsNotEmpty()
  @ApiProperty({
    enum: UserStatus,
    example: UserStatus.ACTIVE,
  })
  status: UserStatus;
}
