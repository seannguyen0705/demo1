import { JobLevel } from '@/utils/enums';

export default function getStringJobLevel(jobLevel: JobLevel) {
  switch (jobLevel) {
    case JobLevel.INTERN:
      return 'Intern';
    case JobLevel.FRESHER:
      return 'Fresher';
    case JobLevel.JUNIOR:
      return 'Junior';
    case JobLevel.SENIOR:
      return 'Senior';
    case JobLevel.MANAGER:
      return 'Manager';
    default:
      return '';
  }
}
