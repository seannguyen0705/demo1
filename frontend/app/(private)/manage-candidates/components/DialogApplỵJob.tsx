'use client';
import { IApplyJob } from '@/api/apply-job/interface';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { FileText, Mail } from 'lucide-react';
import Link from 'next/link';
import useGetApplyJobById from '../hooks/useGetApplyJobById';
import InfoCandidate from './InfoCandidate';
import StatusButton from './StatusButton';
import { FaFilePdf } from 'react-icons/fa';

interface IProps {
  applyJobId: string;
}
export default function DialogApplyJob({ applyJobId }: IProps) {
  const { applyJob } = useGetApplyJobById(applyJobId);
  if (!applyJob) {
    return;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Đơn ứng tuyển</button>
      </DialogTrigger>
      <DialogContent className="overflow-auto h-auto max-h-full sm:max-w-[950px] sm:p-6 p-2">
        <DialogHeader>
          <DialogTitle>Đơn ứng tuyển</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <>
          <InfoCandidate applyJob={applyJob} />

          <h6 className="text-lg font-bold">Hồ sơ CV</h6>
          <Card className="px-4">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-sm bg-red-100 dark:bg-red-900 inline">
                  <FaFilePdf className="text-red-500 dark:text-red-400" />
                </span>
                <div className="min-w-0 max-w-[200px]">
                  <p className="truncate">{applyJob.file.name}</p>
                  <p className="text-sm text-gray-500">
                    Tải lên {format(new Date(applyJob.file.createdAt), 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>

              <Link href={applyJob.file.url} target="_blank">
                <Button variant="outline">Xem CV</Button>
              </Link>
            </div>
          </Card>

          <h6 className="flex items-center text-lg font-bold gap-2">
            <Mail />
            <p>Thư giới thiệu</p>
          </h6>
          {applyJob.message ? (
            <Card className="px-4">
              <p dangerouslySetInnerHTML={{ __html: applyJob.message || '' }}></p>
            </Card>
          ) : (
            <p className="text-gray-500">Không có thư giới thiệu</p>
          )}
        </>

        <DialogFooter>
          <StatusButton status={applyJob.status} applyJobId={applyJobId} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
