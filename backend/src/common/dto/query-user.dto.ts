import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { Order, OrderByUser, UserStatus } from '@/common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryUser extends QueryPaginationDto {
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
    return value;
  })
  @ApiPropertyOptional({
    enum: UserStatus,
    example: UserStatus.ACTIVE,
  })
  status?: UserStatus;

  @IsEnum(OrderByUser)
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  orderBy: OrderByUser;

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
