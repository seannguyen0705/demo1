import { CreateCompanyDto } from '@/api/company/dtos/create-company.dto';
import { IntersectionType } from '@nestjs/swagger';
import { CreateEmployerDto } from '@/api/employer/dto/create-employer.dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBusinessDto extends IntersectionType(
  CreateEmployerDto,
  CreateCompanyDto,
) {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
