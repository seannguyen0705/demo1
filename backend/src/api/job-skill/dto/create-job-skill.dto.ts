import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobSkillDto {
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @IsString()
  @IsNotEmpty()
  skillId: string;
}
