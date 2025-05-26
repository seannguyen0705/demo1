'use client';
import useGetMe from '@/app/hooks/useGetMe';
import NavUser from './NavUser';
import Avatar from './Avatar';
import { Skeleton } from './ui/skeleton';
export default function UserInfo() {
  const { user, isLoading } = useGetMe();

  if (isLoading || !user)
    return (
      <div className="flex items-center gap-2 cursor-pointer relative group">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-20 h-4 rounded-full" />
      </div>
    );

  return (
    <div className="flex items-center gap-2 cursor-pointer relative group">
      <Avatar user={user} />
      <span className="hidden lg:block">{user?.fullName}</span>
      <div className="group-hover:block hidden absolute top-full right-0 bg-white dark:bg-gray-800 shadow-md rounded-md w-56">
        <NavUser role={user?.role} />
      </div>
    </div>
  );
}
