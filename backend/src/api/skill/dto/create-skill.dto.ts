import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { IsNotEmpty } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tên kỹ năng',
    example: 'React',
  })
  name: string;
}
