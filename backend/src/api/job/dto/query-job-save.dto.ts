import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Order, OrderByJobSaved } from '@/common/enums';
import { Transform } from 'class-transformer';

export class QueryJobSaveDto extends QueryPaginationDto {
  @IsEnum(OrderByJobSaved)
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  orderBy?: OrderByJobSaved;

  @IsEnum(Order)
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  order?: Order = Order.DESC;
}
