'use client';
import Experience from '@/app/(private)/manage-candidates/components/Experience';
import Info from '@/app/(private)/manage-candidates/components/Info';
import Intro from '@/app/(private)/manage-candidates/components/Intro';
import Skill from '@/app/(private)/manage-candidates/components/Skill';
import useGetCandidateById from '@/app/(private)/manage-candidates/hooks/useGetCandidateById';

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
import { UserRound } from 'lucide-react';
import CandidateCv from './CandidateCv';

interface IProps {
  candidateId: string;
}
export default function DialogProfile({ candidateId }: IProps) {
  const { candidate } = useGetCandidateById({ candidateId });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border">
          <UserRound className="h-3 w-3" />
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-auto h-auto max-h-full lg:max-h-[95vh] sm:max-w-[800px] sm:p-6 p-2">
        <DialogHeader>
          <DialogTitle>Hồ sơ ứng viên</DialogTitle>
          <DialogDescription>Xem thông tin chi tiết hồ sơ ứng viên.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Info user={candidate} />
          <Intro user={candidate} />
          <Experience experiences={candidate?.experiences || []} />
          <Skill candidateSkills={candidate?.candidateSkills || []} />
          <CandidateCv candidateId={candidateId} />
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
