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

const getNavMenus = (user: IUser | undefined): NavItem[] => {
  const navs = {
    [UserRole.EMPLOYER]: [
      {
        name: 'Tổng quan',
        href: '/employer-dashboard',
        icon: <LayoutDashboard />,
      },
      { name: 'Việc làm', href: '/employer-jobs', icon: <Briefcase /> },
      { name: 'Hồ sơ cá nhân', href: '/profile-personal', icon: <UserRound /> },
      {
        name: 'Công ty',
        href: `/company/${decodeURIComponent(user?.company?.name || '')}`,
        icon: <Building />,
      },
      {
        name: 'Tạo bài tuyển dụng',
        href: '/job-post/create',
        icon: <PencilLine />,
      },
      {
        name: 'Tìm kiếm ứng viên',
        href: '/candidate',
        icon: <UserRoundPlus />,
      },
      { name: 'Cài đặt', href: '/settings', icon: <Settings /> },
    ],
    [UserRole.CANDIDATE]: [
      {
        name: 'Tổng quan',
        href: '/profile-dashboard',
        icon: <LayoutDashboard />,
      },
      { name: 'Hồ sơ cá nhân', href: '/profile-personal', icon: <UserRound /> },
      { name: 'Việc làm của tôi', href: '/my-jobs', icon: <Briefcase /> },
      { name: 'Đăng kí nhận email', href: '/subscription', icon: <Mail /> },
      { name: 'Cài đặt', href: '/settings', icon: <Settings /> },
    ],
    [UserRole.ADMIN]: [
      {
        name: 'Tổng quan',
        href: '/profile-dashboard',
        icon: <LayoutDashboard />,
      },
      { name: 'Hồ sơ cá nhân', href: '/profile-personal', icon: <UserRound /> },
      { name: 'Quản lí nhà tuyển dụng', href: '/employer', icon: <Building /> },
      { name: 'Quản lí ứng viên', href: '/candidate', icon: <UserRoundPlus /> },
    ],
  };
  return navs[user?.role || UserRole.CANDIDATE];
};

export default getNavMenus;
