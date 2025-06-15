import { UserStatus } from '@/common/enums';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReasonDto } from './reason.dto';
export class UpdateStatusUserDto extends ReasonDto {
  @IsEnum(UserStatus)
  @IsNotEmpty()
  @ApiProperty({
    enum: UserStatus,
    example: UserStatus.ACTIVE,
  })
  status: UserStatus;
}
