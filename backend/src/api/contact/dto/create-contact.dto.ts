import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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
  @IsNotEmpty()
  @ApiProperty({ description: 'File ID of the contact', example: '123e4567-e89b-12d3-a456-426614174000' })
  fileId: string;
}
