import { UpdateUserDto } from '@/common/dto/update-user.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserStatus } from '@/common/enums';

export class UpdateCandidateDto extends UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false, example: 'https://www.google.com' })
  personal_website?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false, example: 'Hà Nội, Việt Nam' })
  address?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false, example: 'Software Engineer' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    required: false,
    example: 'Tôi là một lập trình viên',
  })
  introduction?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: false })
  allowNotify?: boolean;

  status?: UserStatus;
}
