import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export default class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Kích thước công ty',
    example: '1-50',
  })
  size?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Loại hình công ty',
    example: 'Công ty cổ phần',
  })
  type?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Ngành nghề công ty',
    example: 'Công nghệ thông tin',
  })
  industry?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Ngày làm việc',
    example: 'Thứ 2 - Thứ 7',
  })
  workingDay?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Giờ làm việc',
    example: '8:00 - 17:00',
  })
  workingTime?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Giới thiệu công ty',
    example: 'Công ty cổ phần',
  })
  overview?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Quyền lợi công ty',
    example: 'Ăn ngủ nghỉ ngơi',
  })
  benefits?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Quốc gia',
    example: 'Việt Nam',
  })
  country?: string;
}
