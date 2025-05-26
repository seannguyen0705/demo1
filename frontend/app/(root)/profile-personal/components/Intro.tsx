import { IUser } from '@/api/interface';
import { Skeleton } from '@/components/ui/skeleton';
import EditIntro from './EditIntro';

function SkeletonIntro() {
  return (
    <section className="dark:bg-gray-900 bg-[#EBF5F4] rounded-[20px] relative p-6">
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
    <section className="dark:bg-gray-900 bg-[#EBF5F4] rounded-[20px] relative p-6">
      <h6 className="text-xl">Giới thiệu bản thân</h6>
      <p className="text-sm dark:text-gray-400 text-gray-500">
        {user?.introduction
          ? user.introduction
          : 'Chưa có thông tin giới thiệu bản thân, hãy cập nhật ngay!'}{' '}
      </p>
      <EditIntro introduction={user?.introduction} />
    </section>
  );
}
