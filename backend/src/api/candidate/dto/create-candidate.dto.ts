import { CreateUserDto } from '@/common/dto/create-user.dto';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateCandidateDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    format: 'password',
    example: 'P@ssw0rd',
  })
  password: string;
}
