import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { Order, OrderByEmployer, UserStatus } from '@/common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryEmployer extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  keyword?: string;

  @IsEnum(UserStatus)
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    if (value === 'Tất cả') {
      return null;
    }
    return value;
  })
  @ApiPropertyOptional({
    enum: UserStatus,
    example: UserStatus.ACTIVE,
  })
  status?: UserStatus;

  @IsEnum(OrderByEmployer)
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  orderBy: OrderByEmployer;

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
