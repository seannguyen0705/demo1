'use client';
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
import useGetCandidateById from '../hooks/useGetCandidateById';

import Info from './Info';
import Intro from './Intro';
import Experience from './Experience';
import Skill from './Skill';
interface IProps {
  candidateId: string;
}
export default function DialogProfile({ candidateId }: IProps) {
  const { candidate, isLoading } = useGetCandidateById({ candidateId });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Hồ sơ</button>
      </DialogTrigger>
      <DialogContent className="overflow-auto h-auto max-h-full sm:max-w-[1000px] sm:p-6 p-2">
        <DialogHeader>
          <DialogTitle>Hồ sơ ứng viên</DialogTitle>
          <DialogDescription>Xem thông tin chi tiết hồ sơ ứng viên.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Info user={candidate} />
          <Intro user={candidate} />
          <Experience experiences={candidate?.experiences || []} />
          <Skill candidateSkills={candidate?.candidateSkills || []} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Đóng</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
