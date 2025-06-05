import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { JobLevel, JobType, SortJob } from '@/common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryJobDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  keyword?: string; // title, description, requirement, benefit, skill

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ required: false })
  provinceName?: string;

  @IsEnum(JobType)
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  @ApiPropertyOptional({ required: false })
  jobType?: JobType;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional({ required: false })
  minSalary?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional({ required: false })
  maxSalary?: number;

  @IsEnum(SortJob)
  @IsOptional()
  @ApiPropertyOptional({ required: false, example: SortJob.NEWEST, enum: SortJob })
  sort?: SortJob = SortJob.NEWEST;

  @IsOptional()
  @IsEnum(JobLevel)
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  @ApiPropertyOptional({ required: false })
  jobLevel?: JobLevel;
}

/*
- keywork sẽ tìm kiếm theo title, description, requirement, benefit, skill, tên công ty
- nếu keywork là tên công ti th ì chỉ tểả về job của công ty đó
- nếu keywork là tên kỹ năng thì tìm kiếm job có kỹ năng đó
*/
