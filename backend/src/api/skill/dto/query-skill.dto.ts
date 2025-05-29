import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QuerySkillDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    required: false,
    type: String,
    description: 'Keyword',
  })
  keyword: string = '';
}
