import { IUser } from '@/api/interface';
import { Skeleton } from '@/components/ui/skeleton';

function SkeletonIntro() {
  return (
    <section className="relative rounded-[20px] bg-[#EBF5F4] p-6 dark:bg-gray-900">
      <Skeleton className="h-7 w-48 bg-white/50" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full bg-white/50" />
        <Skeleton className="h-4 w-3/4 bg-white/50" />
        <Skeleton className="h-4 w-1/2 bg-white/50" />
      </div>
    </section>
  );
}

interface IProps {
  user: IUser | undefined;
}

export default function Intro({ user }: IProps) {
  if (!user) {
    return <SkeletonIntro />;
  }

  return (
    <section className="bg-light-green relative rounded-[20px] p-6 dark:bg-gray-900">
      <h6 className="text-xl">Giới thiệu bản thân</h6>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {user?.introduction ? user.introduction : 'Ứng viên chưa cập nhật thông tin giới thiệu bản thân'}
      </p>
    </section>
  );
}
