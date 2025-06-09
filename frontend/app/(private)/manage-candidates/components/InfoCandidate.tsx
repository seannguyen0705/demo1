import { IApplyJob } from '@/api/apply-job/interface';
import { formatDate } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar, ExternalLink, Mail, Phone, User } from 'lucide-react';
import ShowStatus from './ShowStatus';
import Link from 'next/link';

interface IProps {
  applyJob: IApplyJob;
}

export default function InfoCandidate({ applyJob }: IProps) {
  return (
    <div className="space-y-6">
      {/* Candidate Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Thông tin ứng viên</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Họ tên:</span>
                <span>{applyJob.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span>{applyJob.candidate.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Số điện thoại:</span>
                <span>{applyJob.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Ngày ứng tuyển:</span>
                <span>{formatDate(applyJob.createdAt, 'dd/MM/yyyy', { locale: vi })}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Thông tin ứng tuyển</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">Vị trí ứng tuyển:</span>
                <Link target="_blank" href={`/job/${applyJob.job.id}`} className="text-blue-500 hover:underline">
                  {applyJob.job.title || 'Frontend Developer'}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Trạng thái:</span>
                <ShowStatus status={applyJob.status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
