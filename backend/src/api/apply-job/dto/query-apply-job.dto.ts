import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { ApplyJobStatus, Order, OrderByApplyJob } from '@/common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryApplyJobDto extends QueryPaginationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  keyword: string;

  @IsEnum(Object.keys(ApplyJobStatus))
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    if (value === 'Tất cả') {
      return null;
    }
    return value;
  })
  status: ApplyJobStatus;

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
