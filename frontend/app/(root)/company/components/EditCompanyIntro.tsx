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
import { ICompany } from '@/api/company/interface';
import { useState } from 'react';
import useUpdateCompanyInfo from '../hooks/useUpdateCompanyInfo';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import Editor from '@/components/Editor';
interface IProps {
  company: ICompany;
}
export default function EditCompanyIntro({ company }: IProps) {
  const { overview } = company;
  const { mutate: updateCompany, isPending } = useUpdateCompanyInfo({
    id: company.id,
    name: company.name,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(overview || '');
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="" variant="outline">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] p-6 px-3 md:px-6">
        <DialogHeader>
          <DialogTitle>Giới thiệu công ty</DialogTitle>
          <DialogDescription>
            Cập nhật giới thiệu công ty của bạn
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Editor value={value} onChange={setValue} />
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              updateCompany(
                { overview: value },
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
