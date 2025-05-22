import { IUser } from '@/api/interface';
import { UserRole } from '@/utils/enums';
import {
  Briefcase,
  Building,
  FileText,
  LayoutDashboard,
  Mail,
  PencilLine,
  Settings,
  UserRound,
  UserRoundPlus,
} from 'lucide-react';
import Link from 'next/link';
import { PiHandWaving } from 'react-icons/pi';

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
  user: IUser;
}
export default function NavSide({ user }: IProps) {
  const navs =
    user.role === UserRole.EMPLOYER
      ? navEmployers
      : user.role === UserRole.CANDIDATE
        ? navCandidate
        : navAdmin;

  return (
    <div>
      <aside className=" fixed w-64 bg-[#EBF5F4] rounded-[20px] p-4 hidden lg:block">
        <p className=" flex items-center gap-2 text-sm">
          <PiHandWaving size={25} color="#309689" />
          Xin chào
        </p>
        <p className="text-lg">{user.fullName}</p>

        <ul className="mt-4">
          {navs.map((nav) => (
            <li key={nav.name}>
              <Link
                className="flex items-center gap-2 p-2 rounded-md hover:bg-white dark:hover:bg-gray-700"
                href={nav.href}
              >
                {nav.icon}
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
