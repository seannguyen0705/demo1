import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
    example: 'candidate@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Lorem',
  })
  fullName: string;
}
