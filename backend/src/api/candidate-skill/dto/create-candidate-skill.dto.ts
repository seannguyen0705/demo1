import { SkillYear } from '@/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCandidateSkillDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'The ID of the skill',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  skillId: string;

  @IsNotEmpty()
  @IsEnum(SkillYear)
  @ApiProperty({
    description: 'The year of the skill',
    example: SkillYear.LESS_THAN_1_YEAR,
  })
  skillYear: SkillYear;
}
