import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Order, OrderByApplyJob } from '@/common/enums';
import { Transform } from 'class-transformer';

export class QueryJobApplyDto extends QueryPaginationDto {
  @IsEnum(OrderByApplyJob)
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  orderBy?: OrderByApplyJob;

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
