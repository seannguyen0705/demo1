'use client';
import useGetMe from '@/app/hooks/useGetMe';
import NavUser from './NavUser';
import Avatar from './Avatar';
import { Skeleton } from './ui/skeleton';
export default function UserInfo() {
  const { user } = useGetMe();

  if (!user)
    return (
      <div className="group relative flex cursor-pointer items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 hidden sm:block w-20 rounded-full" />
      </div>
    );

  return (
    <div className="group relative flex cursor-pointer items-center gap-2">
      <Avatar user={user} />
      <span className="hidden lg:block">{user?.fullName}</span>
      <div className="absolute top-full right-0 hidden w-56 overflow-hidden rounded-md bg-white shadow-md group-hover:block dark:bg-gray-800">
        <NavUser user={user} />
      </div>
    </div>
  );
}
