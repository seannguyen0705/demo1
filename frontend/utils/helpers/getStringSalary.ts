import { SalaryType } from '../enums';

export default function getStringSalary(salaryType?: string, salaryMin?: number, salaryMax?: number) {
  if (!salaryType) {
    return '';
  }
  if (salaryType === SalaryType.NEGOTIATION) {
    return 'Thương lượng';
  }
  if (salaryType === SalaryType.RANGE) {
    return `${salaryMin?.toLocaleString()} - ${salaryMax?.toLocaleString()} VND`;
  }
  if (salaryType === SalaryType.ATLEAST) {
    return `Ít nhất ${salaryMin?.toLocaleString()} VND`;
  }
  if (salaryType === SalaryType.UPTO) {
    return `Lên đến ${salaryMax?.toLocaleString()} VND`;
  }
  return '';
}
