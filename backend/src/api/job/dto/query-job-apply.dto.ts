import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { SortJob } from '@/common/enums';

export class QueryJobApplyDto extends QueryPaginationDto {
  @IsEnum(SortJob)
  @IsOptional()
  sort?: SortJob = SortJob.NEWEST;
}
