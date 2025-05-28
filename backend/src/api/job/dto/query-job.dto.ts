import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { JobType, SortJob } from '@/common/enums';
import { IsEnum, IsOptional, IsString, Matches } from 'class-validator';

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
  @IsString()
  @Matches(/^(Thương lượng|\d+|\d+-\d+)$/, {
    message: 'Salary must be "Thương lượng", a number, or a number-number range',
  })
  salary?: string;

  @IsEnum(SortJob)
  @IsOptional()
  sort?: SortJob;
}
