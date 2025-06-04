import {
  LayoutDashboard,
  Briefcase,
  UserRound,
  Building,
  PencilLine,
  UserRoundPlus,
  Settings,
  Mail,
} from 'lucide-react';

import { JSX } from 'react';
import { UserRole } from '../enums';
import { IUser } from '@/api/interface';

interface NavItem {
  name: string;
  href: string;
  icon: JSX.Element;
}

const getNavHeader = (user: IUser | undefined): NavItem[] => {
  const navs = {
    [UserRole.EMPLOYER]: [
      { name: 'Hồ sơ cá nhân', href: '/profile-personal', icon: <UserRound /> },
      { name: 'Việc làm', href: '/manage-jobs', icon: <Briefcase /> },
      {
        name: 'Công ty',
        href: `/company/${decodeURIComponent(user?.company?.name || '')}`,
        icon: <Building />,
      },
      { name: 'Cài đặt', href: '/settings', icon: <Settings /> },
    ],
    [UserRole.CANDIDATE]: [
      { name: 'Hồ sơ cá nhân', href: '/profile-personal', icon: <UserRound /> },
      { name: 'Việc làm của tôi', href: '/my-jobs', icon: <Briefcase /> },
      { name: 'Đăng kí nhận email', href: '/subscription', icon: <Mail /> },
      { name: 'Cài đặt', href: '/settings', icon: <Settings /> },
    ],
    [UserRole.ADMIN]: [
      { name: 'Hồ sơ cá nhân', href: '/profile-personal', icon: <UserRound /> },
      { name: 'Quản lí nhà tuyển dụng', href: '/employer', icon: <Building /> },
      { name: 'Quản lí ứng viên', href: '/candidate', icon: <UserRoundPlus /> },
      { name: 'Cài đặt', href: '/settings', icon: <Settings /> },
    ],
  };
  return navs[user?.role || UserRole.CANDIDATE];
};

export default getNavHeader;
