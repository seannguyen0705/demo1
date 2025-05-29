import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'Rating of the review',
    example: 5,
  })
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Comment of the review',
    example: 'This is a comment',
  })
  comment: string;

  companyId: string;

  candidateId: string;
}
