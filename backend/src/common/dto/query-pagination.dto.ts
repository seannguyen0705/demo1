import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

import { IsNumber } from 'class-validator';

export class QueryPaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    required: false,
    type: Number,
    description: 'Page number',
  })
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiPropertyOptional({
    required: false,
    type: Number,
    description: 'Limit number',
  })
  limit?: number = 10;
}
