import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePublishedJobDto } from './create-published-job.dto';
import { IsUUID } from 'class-validator';
import { IsArray } from 'class-validator';
import { IsOptional } from 'class-validator';
import { ArrayMaxSize } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDraftJobDto extends PartialType(CreatePublishedJobDto) {
  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  @ApiProperty({
    example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000'],
  })
  addressIds: string[];

  @IsArray()
  @IsOptional()
  @IsUUID('4', { each: true })
  @ArrayMaxSize(10)
  @ApiProperty({
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174000',
      '123e4567-e89b-12d3-a456-426614174000',
    ],
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  override skillIds: string[];
}
