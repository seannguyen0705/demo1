import { JobType } from '@/utils/enums';

export default function getStringJobType(jobType: JobType) {
  switch (jobType) {
    case JobType.OFFICE:
      return 'Tại văn phòng';
    case JobType.HYBRID:
      return 'Linh hoạt';
    case JobType.REMOTE:
      return 'Từ xa';
    case JobType.FREELANCE:
      return 'Freelance';
    default:
      return '';
  }
}
