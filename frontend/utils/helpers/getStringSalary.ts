import { SalaryType } from '../enums';

export default function getStringSalary(salaryType?: string, salaryMin?: number, salaryMax?: number) {
  if (!salaryType) {
    return '';
  }
  if (salaryType === SalaryType.NEGOTIATION) {
    return 'Thương lượng';
  }
  if (salaryType === SalaryType.RANGE) {
    return `${salaryMin} - ${salaryMax} VND`;
  }
  if (salaryType === SalaryType.ATLEAST) {
    return `Ít nhất ${salaryMin} VND`;
  }
  if (salaryType === SalaryType.UPTO) {
    return `Lên đến ${salaryMax} VND`;
  }
  return '';
}
