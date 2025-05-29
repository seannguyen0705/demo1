import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateReviewDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Comment of the review',
    example: 'This is a comment',
  })
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'Rating of the review',
    example: 5,
  })
  rating: number;
}
