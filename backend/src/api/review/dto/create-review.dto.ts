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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Company ID of the review',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  companyId: string;

  candidateId: string;
}
