import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { IsArray, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QuerySkillDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    required: false,
    type: String,
    description: 'Keyword',
  })
  keyword: string = '';

  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    required: false,
    type: [String],
    description: 'Exclude skill ids',
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  excludeSkillIds: string[] = [];
}
