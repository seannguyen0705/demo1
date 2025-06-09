import { ApplyJobStatus, ApplyJobStatusQuery } from '@/common/enums';

export default function mapQueryStatusToStatusDb(status: ApplyJobStatusQuery) {
  if (status === ApplyJobStatusQuery.NEW) {
    return ApplyJobStatus.NEW;
  }
  if (status === ApplyJobStatusQuery.SEEN) {
    return ApplyJobStatus.SEEN;
  }
  if (status === ApplyJobStatusQuery.INTERVIEWING) {
    return ApplyJobStatus.INTERVIEWING;
  }
  if (status === ApplyJobStatusQuery.HIRED) {
    return ApplyJobStatus.HIRED;
  }
  if (status === ApplyJobStatusQuery.REJECTED) {
    return ApplyJobStatus.REJECTED;
  }
}
