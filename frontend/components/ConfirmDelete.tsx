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
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface IProps {
  title: string;
  description: string;
  action: () => void;
  button: React.ReactNode;
  disabled?: boolean;
}

export default function ConfirmDelete({ title, description, action, button, disabled }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="outline">
            Hủy
          </Button>
          <Button
            disabled={disabled}
            variant="destructive"
            onClick={async () => {
              action();
              setIsOpen(false);
            }}
          >
            Xóa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
