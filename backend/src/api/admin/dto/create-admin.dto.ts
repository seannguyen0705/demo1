import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CreateUserDto } from '@/common/dto/create-user.dto';

export class CreateAdminDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    format: 'password',
    example: 'P@ssw0rd',
  })
  password: string;
}
