import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { OrderByReview, Order } from '@/common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryReviewDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  keyword?: string;

  @IsEnum(OrderByReview)
  @IsOptional()
  @ApiPropertyOptional({ enum: OrderByReview })
  orderBy?: OrderByReview;

  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  @ApiPropertyOptional({ enum: Order })
  order?: Order;
}
