import { CreateCompanyDto } from '@/api/company/dtos/create-company.dto';
import { IntersectionType } from '@nestjs/swagger';
import { CreateEmployerDto } from '@/api/employer/dto/create-employer.dto';

export class CreateBusinessDto extends IntersectionType(CreateEmployerDto, CreateCompanyDto) {}
