import { IsOptional, IsString } from 'class-validator';

export class UpdateExperienceDto {
  @IsString()
  @IsOptional()
  workTitle?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
