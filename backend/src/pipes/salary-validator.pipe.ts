import { SalaryType } from '@/common/enums';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: false })
export class SalaryValidatorPipe implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object: any = args.object;
    const { salaryType, salaryMin, salaryMax } = object;

    if (!salaryType) {
      return true;
    }

    switch (salaryType) {
      case SalaryType.NEGOTIATION:
        return !salaryMin && !salaryMax;
      case SalaryType.UPTO:
        return salaryMax && !salaryMin;
      case SalaryType.RANGE:
        return salaryMin && salaryMax;
      case SalaryType.ATLEAST:
        return salaryMin && !salaryMax;
      default:
        return false;
    }
  }

  defaultMessage() {
    return 'Invalid salary fields for the selected salaryType.';
  }
}
