import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSkillDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The name of the skill',
    example: 'JavaScript',
  })
  name: string;
}
