import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Order, OrderByContact } from '@/common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
export class QueryContactDto extends QueryPaginationDto {
  @IsString()
  @IsOptional()
  keyword?: string;

  @IsEnum(OrderByContact)
  @IsOptional()
  @ApiPropertyOptional({ enum: OrderByContact })
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  orderBy?: OrderByContact;

  @IsEnum(Order)
  @IsOptional()
  @ApiPropertyOptional({ enum: Order })
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  order?: Order;
}
