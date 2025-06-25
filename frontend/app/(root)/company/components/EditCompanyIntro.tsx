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
import { ICompany } from '@/apiService/company/interface';
import { useState } from 'react';
import useUpdateCompanyInfo from '../hooks/useUpdateCompanyInfo';
import { isErrorResponse } from '@/utils/helpers/isErrorResponse';
import Editor from '@/components/Editor';
import useGetMe from '@/app/hooks/useGetMe';
interface IProps {
  company: ICompany;
}
export default function EditCompanyIntro({ company }: IProps) {
  const { user } = useGetMe();
  const isOwner = user?.id === company.employerId;
  const { overview } = company;
  const { mutate: updateCompany, isPending } = useUpdateCompanyInfo({
    name: company.name,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(overview || '');
  if (!isOwner) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="" variant="outline">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 px-3 sm:max-w-[1000px] md:px-6">
        <DialogHeader>
          <DialogTitle>Giới thiệu công ty</DialogTitle>
          <DialogDescription>Cập nhật giới thiệu công ty của bạn</DialogDescription>
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
