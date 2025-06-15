import { IsOptional, IsString } from 'class-validator';

export class ReasonDto {
  @IsString()
  @IsOptional()
  reason: string;
}
