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

import { UserStatus } from '@/utils/enums';
import { CiLock } from 'react-icons/ci';
import useUpdateCandidateStatus from '../hooks/useUpdateCandidateStatus';

interface IProps {
  candidate: IUser;
}
export default function ConfirmBanCandidate({ candidate }: IProps) {
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
          <CiLock className="h-3 w-3" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Khóa tài khoản</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn khóa tài khoản <span className="font-bold">{candidate.fullName}</span> không?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <label htmlFor="reason" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Lý do khóa (không bắt buộc)
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
              updateCandidateStatus({ status: UserStatus.BANNED, reason });
              setIsOpen(false);
            }}
          >
            Khóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
