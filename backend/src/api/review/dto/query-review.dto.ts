import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { OrderByReview, Order } from '@/common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryReviewDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  keyword?: string;

  @IsEnum(OrderByReview)
  @IsOptional()
  @ApiPropertyOptional({ enum: OrderByReview })
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  orderBy?: OrderByReview;

  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  @ApiPropertyOptional({ enum: Order })
  order?: Order;
}
