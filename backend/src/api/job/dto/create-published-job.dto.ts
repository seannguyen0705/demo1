import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CreateAddressDto } from '@/api/address/dto/create-address.dto';
import { BaseJobDto } from './create-base-job.dto';

export class CreatePublishedJobDto extends BaseJobDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Nhân viên bán hàng' })
  override title: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  override addresses: CreateAddressDto[];

  @IsArray()
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ApiProperty({
    example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000'],
  })
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  override skillIds: string[];
}
