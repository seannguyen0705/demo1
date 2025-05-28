import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty, IsEnum } from 'class-validator';

import { UserRole } from '@/common/enums';

export class LogInDto {
  @IsNotEmpty()
  @IsEnum(UserRole)
  @ApiProperty({
    enum: UserRole,
    default: UserRole.CANDIDATE,
  })
  role: UserRole;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ format: 'password', example: 'P@ssw0rd' })
  password: string;
}
