import { SalaryType } from '../enums';

export default function getShortStringSalary(salaryType?: string, salaryMin?: number, salaryMax?: number) {
  if (!salaryType) {
    return '';
  }
  if (salaryType === SalaryType.NEGOTIATION) {
    return 'Thương lượng';
  }
  if (salaryType === SalaryType.RANGE) {
    return `${(salaryMin || 0) / 1000000} - ${(salaryMax || 0) / 1000000} triệu`;
  }
  if (salaryType === SalaryType.ATLEAST) {
    return `Ít nhất ${(salaryMin || 0) / 1000000} triệu`;
  }
  if (salaryType === SalaryType.UPTO) {
    return `Lên đến ${(salaryMax || 0) / 1000000} triệu`;
  }
  return '';
}
