'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

import { IUser } from '@/api/interface';
import useUpdateCandidateStatus from '../hooks/useUpdateCandidateStatus';
import { UserStatus } from '@/utils/enums';
import { CiUnlock } from 'react-icons/ci';

interface IProps {
  candidate: IUser;
}
export default function ConfirmUnbanCandidate({ candidate }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: updateCandidateStatus, isPending } = useUpdateCandidateStatus({ id: candidate.id });
  const [reason, setReason] = useState('');
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border"
          disabled={isPending}
        >
          <CiUnlock className="h-3 w-3" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Khóa tài khoản</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn mở khóa tài khoản <span className="font-bold">{candidate.fullName}</span> không?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <label htmlFor="reason" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Lý do mở khóa (không bắt buộc)
          </label>
          <textarea
            id="reason"
            className="min-h-[120px] w-full rounded-md border p-3 dark:bg-gray-800 dark:text-white"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="outline">
            Hủy
          </Button>
          <Button
            disabled={isPending}
            onClick={async () => {
              updateCandidateStatus({ status: UserStatus.ACTIVE, reason });
              setIsOpen(false);
            }}
          >
            Mở khóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
