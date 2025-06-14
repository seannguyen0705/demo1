import { IsString, IsOptional } from 'class-validator';

export class DeleteJobDto {
  @IsString()
  @IsOptional()
  reason: string;
}
