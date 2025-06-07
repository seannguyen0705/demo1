import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { ApplyJobStatus, Order, OrderByApplyJob } from '@/common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryApplyJobDto extends QueryPaginationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  keyword: string;

  @IsEnum(ApplyJobStatus)
  @IsOptional()
  @ApiPropertyOptional()
  status: ApplyJobStatus;

  @IsEnum(OrderByApplyJob)
  @IsOptional()
  @ApiPropertyOptional()
  orderBy: OrderByApplyJob;

  @IsEnum(Order)
  @IsOptional()
  @ApiPropertyOptional()
  order: Order;
}
