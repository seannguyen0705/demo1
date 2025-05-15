import { CreateUserDto } from '@/common/dto/create-user.dto';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEmployerDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'HR',
  })
  workTitle: string;

  @IsPhoneNumber('VN')
  @IsNotEmpty()
  @ApiProperty({
    example: '0909090909',
  })
  phoneNumber: string;
}
