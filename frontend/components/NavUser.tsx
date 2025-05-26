import { logout } from '@/api/auth/action';
import { UserRole } from '@/utils/enums';
import {
  Briefcase,
  Building,
  LayoutDashboard,
  LogOut,
  Mail,
  PencilLine,
  Settings,
  UserRound,
  UserRoundPlus,
} from 'lucide-react';
import Link from 'next/link';

const navEmployers = [
  {
    name: 'Tổng quan',
    href: '/employer-dashboard',
    icon: <LayoutDashboard />,
  },
  {
    name: 'Việc làm',
    href: '/employer-jobs',
    icon: <Briefcase />,
  },
  {
    name: 'Hồ sơ cá nhân',
    href: '/profile-personal',
    icon: <UserRound />,
  },
  {
    name: 'Công ty',
    href: '/company',
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
  {
    name: 'Cài đặt',
    href: '/settings',
    icon: <Settings />,
  },
];

const navCandidate = [
  {
    name: 'Tổng quan',
    href: '/profile-dashboard',
    icon: <LayoutDashboard />,
  },
  // {
  //   name: 'Cv của tôi',
  //   href: '/profile-cv',
  //   icon: <FileText />,
  // },
  {
    name: 'Hồ sơ cá nhân',
    href: '/profile-personal',
    icon: <UserRound />,
  },
  {
    name: 'Việc làm của tôi',
    href: '/my-jobs',
    icon: <Briefcase />,
  },
  {
    name: 'Đăng kí nhận email',
    href: '/subscription',
    icon: <Mail />,
  },
  {
    name: 'Cài đặt',
    href: '/settings',
    icon: <Settings />,
  },
];

const navAdmin = [
  {
    name: 'Tổng quan',
    href: '/profile-dashboard',
    icon: <LayoutDashboard />,
  },
  {
    name: 'Hồ sơ cá nhân',
    href: '/profile-personal',
    icon: <UserRound />,
  },
  {
    name: 'Quản lí nhà tuyển dụng',
    href: '/employer',
    icon: <Building />,
  },
  {
    name: 'Quản lí ứng viên',
    href: '/candidate',
    icon: <UserRoundPlus />,
  },
];

interface IProps {
  role: UserRole;
}
export default function NavUser({ role }: IProps) {
  const navs =
    role === UserRole.EMPLOYER
      ? navEmployers
      : role === UserRole.ADMIN
        ? navAdmin
        : navCandidate;
  return (
    <ul className=" dark:bg-gray-800 dark:text-white  ">
      {navs.map((nav) => (
        <li className="border-b" key={nav.name}>
          <NavItem
            key={nav.name}
            name={nav.name}
            href={nav.href}
            icon={nav.icon}
          />
        </li>
      ))}
      <li className="border-b px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 text-left text-sm"
        >
          <LogOut />
          Đăng xuất{' '}
        </button>
      </li>
    </ul>
  );
}

interface INavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}
const NavItem = ({ name, href, icon }: INavItem) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {icon}
      <span>{name}</span>
    </Link>
  );
};
