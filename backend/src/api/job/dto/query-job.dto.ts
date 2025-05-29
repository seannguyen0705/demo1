import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { JobType, SortJob } from '@/common/enums';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryJobDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  keywork?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsEnum(JobType)
  @IsOptional()
  jobType?: JobType;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minSalary?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxSalary?: number;

  @IsEnum(SortJob)
  @IsOptional()
  sort?: SortJob;
}
