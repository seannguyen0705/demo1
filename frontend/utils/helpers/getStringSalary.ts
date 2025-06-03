import { SalaryType } from '../enums';

export default function getStringSalary(salaryType?: string, salaryMin?: number, salaryMax?: number) {
  if (!salaryType) {
    return '';
  }
  if (salaryType === SalaryType.NEGOTIATION) {
    return 'Thương lượng';
  }
  if (salaryType === SalaryType.RANGE) {
    return `${salaryMin} - ${salaryMax} USD`;
  }
  if (salaryType === SalaryType.ATLEAST) {
    return `Ít nhất ${salaryMin} USD`;
  }
  if (salaryType === SalaryType.UPTO) {
    return `Lên đến ${salaryMax} USD`;
  }
  return '';
}
