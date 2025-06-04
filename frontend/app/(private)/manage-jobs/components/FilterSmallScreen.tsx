'use client';
import JobStatusFilterSmall from '@/app/(root)/job/components/JobStatusFilterSmall';
import JobTypeFilterSmall from '@/app/(root)/job/components/JobTypeFIlterSmall';
import LevelFilterSmall from '@/app/(root)/job/components/LevelFilterSmall';
import ProvinceFilterSmall from '@/app/(root)/job/components/ProvinceFilterSmall';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Funnel } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface IProps {
  isEmployer: boolean;
}
export default function FilterSmallScreen({ isEmployer }: IProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [jobLevel, setJobLevel] = useState(searchParams.get('jobLevel') || '');
  const [jobType, setJobType] = useState(searchParams.get('jobType') || '');
  const [minSalary, setMinSalary] = useState(searchParams.get('minSalary') || '');
  const [maxSalary, setMaxSalary] = useState(searchParams.get('maxSalary') || '');
  const [provinceName, setProvinceName] = useState(searchParams.get('provinceName') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const countFilter = () => {
    let count = 0;
    if (jobLevel) count++;
    if (jobType) count++;
    if (minSalary) count++;
    if (maxSalary) count++;
    if (provinceName) count++;
    if (status) count++;
    return count;
  };

  const handleApply = () => {
    const queryParams = new URLSearchParams();
    queryParams.set('jobLevel', jobLevel);
    queryParams.set('jobType', jobType);
    queryParams.set('minSalary', minSalary);
    queryParams.set('maxSalary', maxSalary);
    queryParams.set('provinceName', provinceName);
    queryParams.set('status', status);
    setOpen(false);
    router.replace(`/job?${queryParams.toString()}`);
  };

  const handleClear = () => {
    setJobLevel('');
    setJobType('');
    setMinSalary('');
    setMaxSalary('');
    setProvinceName('');
    setStatus('');
    setOpen(false);
    router.replace('job');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="xl:hidden" asChild>
        <Button variant="outline">
          <Funnel /> Bộ lọc ({countFilter()})
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto h-auto max-h-full sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-2xl font-bold border-b pb-2">Bộ lọc tìm kiếm</DialogTitle>
        </DialogHeader>
        <div className="">
          <LevelFilterSmall jobLevel={jobLevel} onChange={setJobLevel} />
          <JobTypeFilterSmall jobType={jobType} onChange={setJobType} />

          <div className="border-b pb-2 mb-2">
            <h3 className="mb-2">Mức lương (VND) </h3>
            <div className="flex gap-2">
              <Input
                className="selection:bg-green"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                type="number"
                placeholder="Từ"
              />
              <Input
                className="selection:bg-green"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                type="number"
                placeholder="Đến"
              />
            </div>
          </div>
          <ProvinceFilterSmall provinceName={provinceName} onChange={setProvinceName} />
          {isEmployer && <JobStatusFilterSmall jobStatus={status} onChange={setStatus} />}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleClear} variant="destructive">
              Xóa tất cả
            </Button>
          </DialogClose>
          <Button className="bg-green hover:bg-green/80 " onClick={handleApply} type="submit">
            Áp dụng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
