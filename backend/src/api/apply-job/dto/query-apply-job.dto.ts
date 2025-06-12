import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { ApplyJobStatusQuery, Order, OrderByApplyJob } from '@/common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryApplyJobDto extends QueryPaginationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  keyword: string;

  @IsEnum(ApplyJobStatusQuery)
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    if (value === 'all') {
      return null;
    }
    return value;
  })
  status: ApplyJobStatusQuery;

  @IsEnum(OrderByApplyJob)
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  orderBy: OrderByApplyJob;

  @IsEnum(Order)
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  order: Order = Order.DESC;
}
