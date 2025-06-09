import { ApplyJobStatus, ApplyJobStatusQuery } from '@/common/enums';

export default function mapStatusDbToQueryStatus(status: ApplyJobStatus) {
  if (status === ApplyJobStatus.NEW) {
    return ApplyJobStatusQuery.NEW;
  }
  if (status === ApplyJobStatus.SEEN) {
    return ApplyJobStatusQuery.SEEN;
  }
  if (status === ApplyJobStatus.INTERVIEWING) {
    return ApplyJobStatusQuery.INTERVIEWING;
  }
  if (status === ApplyJobStatus.HIRED) {
    return ApplyJobStatusQuery.HIRED;
  }
  if (status === ApplyJobStatus.REJECTED) {
    return ApplyJobStatusQuery.REJECTED;
  }
}
