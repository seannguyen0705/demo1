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

import { IUser } from '@/apiService/interface';
import useUpdateEmployerStatus from '../hooks/useUpdateEmployerStatus';
import { UserStatus } from '@/utils/enums';
import { CiLock } from 'react-icons/ci';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  reason: z.string().optional(),
});

interface IProps {
  employer: IUser;
}
export default function ConfirmBanEmployer({ employer }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: updateEmployerStatus, isPending } = useUpdateEmployerStatus({ id: employer.id });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: '',
    },
  });

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
            Bạn có chắc chắn muốn khóa tài khoản <span className="font-bold">{employer.fullName}</span> không?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <label htmlFor="reason" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Lý do khóa (không bắt buộc)
          </label>
          <textarea
            id="reason"
            className="min-h-[120px] w-full rounded-md border p-3 dark:bg-gray-800 dark:text-white"
            {...form.register('reason')}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="outline">
            Hủy
          </Button>
          <Button
            className="disabled:opacity-50"
            disabled={isPending}
            onClick={form.handleSubmit((data) => {
              updateEmployerStatus(
                { status: UserStatus.BANNED, reason: data.reason },
                {
                  onSuccess: () => {
                    setIsOpen(false);
                  },
                },
              );
            })}
          >
            Khóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
