import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { JobLevel, JobType, SortJob } from '@/common/enums';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryJobDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  keyword?: string; // title, description, requirement, benefit, skill

  @IsOptional()
  @IsString()
  provinceName?: string;

  @IsEnum(JobType)
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  jobType?: JobType;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minSalary?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxSalary?: number;

  @IsEnum(SortJob)
  @IsOptional()
  sort?: SortJob;

  @IsOptional()
  @IsEnum(JobLevel)
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  jobLevel?: JobLevel;
}

/*
- keywork sẽ tìm kiếm theo title, description, requirement, benefit, skill, tên công ty
- nếu keywork là tên công ti th ì chỉ tểả về job của công ty đó
- nếu keywork là tên kỹ năng thì tìm kiếm job có kỹ năng đó
*/
