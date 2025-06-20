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
import useAdminDeleteJob from '../hooks/useAdminDeleteJob';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IJob } from '@/api/job/interface';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  reason: z.string().optional(),
});

interface IProps {
  job: IJob;
}
export default function ConfirmDeleteJob({ job }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteJob, isPending } = useAdminDeleteJob({ id: job.id });

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
          <Trash2 className="h-3 w-3" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa việc làm</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa việc làm <span className="font-bold">{job.title}</span> không?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <label htmlFor="reason" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Lý do xóa (không bắt buộc)
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
            disabled={isPending}
            className="disabled:opacity-50"
            onClick={form.handleSubmit((data) => {
              deleteJob(data.reason, {
                onSuccess: () => {
                  setIsOpen(false);
                },
              });
            })}
          >
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
