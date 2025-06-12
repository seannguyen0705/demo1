import { Button } from '@/components/ui/button';
import { UserRound } from 'lucide-react';
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
import useGetEmployerById from '../hooks/useGetEmployerById';
import InforEmployer from './InforEmployer';
import InforCompany from './InforCompany';
interface IProps {
  employerId: string;
}
export default function DialogProfile({ employerId }: IProps) {
  const { employer, isLoading } = useGetEmployerById({ employerId });
  if (!employer) {
    return (
      <Button variant="outline">
        <UserRound />
      </Button>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="shadow-md">
          <UserRound />
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto h-auto max-h-full lg:max-h-[95vh] sm:max-w-[800px] sm:p-6 p-2">
        <DialogHeader>
          <DialogTitle>Hồ sơ nhà tuyển dụng</DialogTitle>
          <DialogDescription>Xem thông tin chi tiết hồ sơ nhà tuyển dụng.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <InforEmployer employer={employer} />
          <InforCompany company={employer.company} />
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
