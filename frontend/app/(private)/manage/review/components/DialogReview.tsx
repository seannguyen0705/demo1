import { IReview } from '@/apiService/review/interface';
import StarRating from '@/app/(root)/company/components/StarRating';
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
import { Eye, Star } from 'lucide-react';
interface IProps {
  review: IReview;
}
export default function DialogReview({ review }: IProps) {
  const { candidate, company } = review;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="shadow-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md border">
          <Eye className="h-3 w-3" />
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-auto h-auto max-h-full lg:max-h-[95vh] sm:max-w-[800px] sm:p-6 p-2">
        <DialogHeader>
          <DialogTitle>Chi tiết đánh giá</DialogTitle>
          <DialogDescription>
            Đánh giá của <span className="font-bold">{review.candidate.fullName}</span> về{' '}
            <span className="font-bold">{review.company.name}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Tên công ty:</label>
            <p>{company.name}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Lĩnh vực:</label>
            <p>{company.industry}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Người đánh giá:</label>
            <p>{candidate.fullName}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Email:</label>
            <p>{candidate.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Đánh giá:</label>
            <div className="flex items-center gap-2 mt-1">
              <StarRating
                rating={review.rating}
                icon={<Star size={16} className="fill-yellow-500 text-yellow-500" />}
              />

              <span className="font-medium">{review.rating}/5</span>
            </div>
          </div>
        </div>

        <div className="">
          <label className="text-sm font-medium">Nội dung</label>
          <p
            dangerouslySetInnerHTML={{ __html: review.comment }}
            className="mt-1 text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded-md border-l-2 border-green"
          ></p>
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
