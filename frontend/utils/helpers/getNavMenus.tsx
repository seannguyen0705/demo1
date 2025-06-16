import {
  Briefcase,
  UserRound,
  Building,
  PencilLine,
  UserRoundPlus,
  Settings,
  Mail,
  UsersRound,
  LayoutDashboard,
  Star,
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
      // {
      //   name: 'Tổng quan',
      //   href: '/employer-dashboard',
      //   icon: <LayoutDashboard />,
      // },
      { name: 'Việc làm', href: '/manage-jobs', icon: <Briefcase /> },
      { name: 'Hồ sơ cá nhân', href: '/profile-personal', icon: <UserRound /> },
      {
        name: 'Công ty',
        href: `/company/${decodeURIComponent(user?.company?.name || '')}`,
        icon: <Building />,
      },
      {
        name: 'Tạo bài tuyển dụng',
        href: '/create-job',
        icon: <PencilLine />,
      },
      {
        name: 'Ứng viên',
        href: '/manage-candidates',
        icon: <UsersRound />,
      },
      { name: 'Cài đặt', href: '/settings', icon: <Settings /> },
    ],
    [UserRole.CANDIDATE]: [
      // {
      //   name: 'Tổng quan',
      //   href: '/profile-dashboard',
      //   icon: <LayoutDashboard />,
      // },
      { name: 'Hồ sơ cá nhân', href: '/profile-personal', icon: <UserRound /> },
      { name: 'Việc làm của tôi', href: '/my-jobs', icon: <Briefcase /> },
      { name: 'Đăng kí nhận email', href: '/subscription', icon: <Mail /> },
      { name: 'Cài đặt', href: '/settings', icon: <Settings /> },
    ],
    [UserRole.ADMIN]: [
      { name: 'Nhà tuyển dụng', href: '/manage/employer', icon: <Building /> },
      { name: 'Ứng viên', href: '/manage/candidate', icon: <UsersRound /> },
      { name: 'Việc làm', href: '/manage/job', icon: <Briefcase /> },
      { name: 'Đánh giá', href: '/manage/review', icon: <Star /> },
      { name: 'Cài đặt', href: '/settings', icon: <Settings /> },
    ],
  };
  return navs[user?.role || UserRole.CANDIDATE];
};

export default getNavMenus;
