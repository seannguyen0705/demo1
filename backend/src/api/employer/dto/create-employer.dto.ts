import { CreateUserDto } from '@/common/dto/create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEmployerDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'HR',
  })
  workTitle: string;
}
