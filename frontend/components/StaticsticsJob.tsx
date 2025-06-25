import { Button } from '@/components/ui/button';
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
import { ChartColumn } from 'lucide-react';

import useGetStaticsticByJobId from '@/app/hooks/useGetStaticsticByJobId';
import { IJob } from '@/apiService/job/interface';
import { Skeleton } from '@/components/ui/skeleton';
import PieChartJob from './PieChartJob';
interface IProps {
  job: IJob;
}
export function StaticsticsJob({ job }: IProps) {
  const { statistics, isLoading } = useGetStaticsticByJobId(job.id);
  if (isLoading || !statistics) return <Skeleton className="w-10 h-10" />;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ChartColumn /> Thông kê
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:p-6 p-3">
        <DialogHeader>
          <DialogTitle>Thống kê {job.title}</DialogTitle>
          <DialogDescription>Theo dõi hiệu quả tuyển dụng</DialogDescription>
        </DialogHeader>

        <PieChartJob jobStatistics={statistics} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Đóng</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
