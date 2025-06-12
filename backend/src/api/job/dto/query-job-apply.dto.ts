import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Order, OrderByJob } from '@/common/enums';

export class QueryJobApplyDto extends QueryPaginationDto {
  @IsEnum(OrderByJob)
  @IsOptional()
  orderBy?: OrderByJob;

  @IsEnum(Order)
  @IsOptional()
  order?: Order = Order.DESC;
}
