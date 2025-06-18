import Link from 'next/link';
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
import { ExternalLink, Eye } from 'lucide-react';
import useGetContactById from '../hooks/useGetContactById';
import { formatDate } from 'date-fns';
interface IProps {
  id: string;
}
export default function DialogReport({ id }: IProps) {
  const { data } = useGetContactById(id);
  if (!data) return null;
  const { fullName, email, title, content, createdAt, file } = data;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border">
          <Eye className="h-3 w-3" />
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-auto h-auto max-h-full lg:max-h-[95vh] sm:max-w-[800px] sm:p-6 p-2">
        <DialogHeader>
          <DialogTitle>Chi tiết báo cáo</DialogTitle>
          <DialogDescription>
            Báo cáo của <span className="font-bold">{fullName}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Tên người báo cáo:</label>
            <p>{fullName}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Email:</label>
            <p>{email}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Tiêu đề:</label>
            <p>{title}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Ngày tạo:</label>
            <p>{formatDate(createdAt, 'dd/MM/yyyy')}</p>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Nội dung:</label>
            <p className="mt-1 text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded-md border-l-2 border-green">
              {content}
            </p>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium">File đính kèm:</label>

            <Link href={file.url} target="_blank" className="text-sm text-blue-500 flex items-center gap-2">
              {file.name}
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
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
