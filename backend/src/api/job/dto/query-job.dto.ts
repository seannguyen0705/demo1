import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { JobLevel, JobType, OrderByJob, Order } from '@/common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryJobDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  keyword?: string; // title, description, requirement, benefit, skill

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  provinceName?: string;

  @IsEnum(JobType)
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  @ApiPropertyOptional()
  jobType?: JobType;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  minSalary?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  maxSalary?: number;

  @IsEnum(OrderByJob)
  @IsOptional()
  @ApiPropertyOptional({ example: OrderByJob.CREATED_AT, enum: OrderByJob })
  orderBy?: OrderByJob;

  @IsEnum(Order)
  @IsOptional()
  @ApiPropertyOptional({ example: Order.DESC, enum: Order })
  order?: Order = Order.DESC;

  @IsOptional()
  @IsEnum(JobLevel)
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  @ApiPropertyOptional()
  jobLevel?: JobLevel;
}

/*
- keywork sẽ tìm kiếm theo title, description, requirement, benefit, skill, tên công ty
- nếu keywork là tên công ti th ì chỉ tểả về job của công ty đó
- nếu keywork là tên kỹ năng thì tìm kiếm job có kỹ năng đó
*/
