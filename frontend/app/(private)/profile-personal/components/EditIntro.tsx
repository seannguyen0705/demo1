'use client';
import { SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useUpdateCandidate from '../hooks/useUpdateCandidate';

import { useState } from 'react';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';

interface IProps {
  introduction: string | undefined;
}
export default function EditIntro({ introduction }: IProps) {
  const { mutate: updateCandidate, isPending } = useUpdateCandidate();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(introduction || '');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="" variant="outline">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Giới thiệu bản thân</DialogTitle>
          <DialogDescription>
            Giới thiệu điểm mạnh và số năm kinh nghiệm của bạn
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <textarea
            className="min-h-[200px] w-full rounded-md border p-3 dark:bg-gray-800 dark:text-white"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Nhập nội dung giới thiệu của bạn..."
          />
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              updateCandidate(
                { introduction: value },
                {
                  onSuccess: (data: object) => {
                    if (!isErrorResponse(data)) {
                      setIsOpen(false);
                    }
                  },
                },
              );
            }}
            disabled={isPending}
          >
            {isPending ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
