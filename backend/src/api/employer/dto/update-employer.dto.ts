import { UpdateUserDto } from '@/common/dto/update-user.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateEmployerDto extends UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false, example: 'https://www.google.com' })
  personal_website?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false, example: 'Software Engineer' })
  title?: string;
}
