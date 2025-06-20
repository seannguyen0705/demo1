import { UserRole } from '@/common/enums';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email của người dùng',
    example: 'example@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  @ApiProperty({
    description: 'Vai trò của người dùng',
    example: 'admin',
  })
  role: UserRole;
}
