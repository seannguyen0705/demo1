import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Full name of the contact', example: 'John Doe' })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Email of the contact', example: 'john.doe@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Title of the contact', example: 'Hello, I am John Doe' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Content of the contact', example: 'Hello, I am John Doe' })
  content: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }
    return value;
  })
  @ApiPropertyOptional({ description: 'File ID of the contact', example: '123e4567-e89b-12d3-a456-426614174000' })
  fileId: string;
}
