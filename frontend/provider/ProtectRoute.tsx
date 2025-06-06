'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const privatePaths = ['/profile-personal', 'create-job', 'manage-jobs'];
const authPaths = ['/sign-in', '/sign-up', '/recruitment/sign-in', '/recruitment', '/admin/sign-in'];

interface IProps {
  isAuth: boolean;
  children: React.ReactNode;
}
export default function ProtectRoute({ isAuth, children }: IProps) {
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    console.log(isAuth, currentPath);
    if (privatePaths.some((path) => currentPath.startsWith(path)) && !isAuth) {
      router.replace('/sign-in');
    } else if (authPaths.some((path) => currentPath.startsWith(path)) && isAuth) {
      router.replace('/');
    }
  }, [isAuth, currentPath]);

  return <>{children}</>;
}
